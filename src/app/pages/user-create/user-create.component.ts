import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule, 
    TableModule, 
    DialogModule, 
    InputTextModule, 
    FileUploadModule,
    BadgeModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {
  displayModal: boolean = false;
  userForm!: FormGroup;
  profileImage: File | null = null;
  profileImageUrl: string | ArrayBuffer | null = null;
  users: any[] = [];
  loading: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private toasterService: ToasterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      companyMail: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.pattern('^[0-9]*$')],
      address: [''],
      profileImage: [null]
    });

    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
    } else {
      this.loading = false;
    }
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data || response || [];
        this.loading = false;
      },
      error: (err) => {
        this.toasterService.showError('Error fetching users');
        this.loading = false;
      }
    });
  }

  showModal() {
    this.displayModal = true;
    this.userForm.reset();
    this.profileImage = null;
    this.profileImageUrl = null;
  }

  onProfileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.profileImage = file;
      this.userForm.patchValue({ profileImage: file });
      
      const reader = new FileReader();
      reader.onload = (e) => this.profileImageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  getRoleSeverity(role: string): 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined {
    if (!role) return 'info';
    const r = role.toLowerCase();
    if (r.includes('lead') || r.includes('admin')) return 'info';
    if (r.includes('hr') || r.includes('manager')) return 'success';
    if (r.includes('designer') || r.includes('developer') || r.includes('project')) return 'help';
    if (r.includes('qa') || r.includes('analyst')) return 'warning';
    return 'info';
  }

  getInitials(firstName: string, lastName: string): string {
    return ((firstName?.charAt(0) || '') + (lastName?.charAt(0) || '')).toUpperCase() || 'U';
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };
      
      if (this.profileImageUrl) {
        formValue.profileImage = this.profileImageUrl as string;
      } else {
        delete formValue.profileImage;
      }
      
      this.userService.createUser(formValue).subscribe({
        next: (res) => {
          this.toasterService.showSuccess('User created successfully');
          this.displayModal = false;
          this.loadUsers();
        },
        error: (err) => {
          this.toasterService.showError('Error creating user');
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
