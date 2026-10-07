import { Component, inject } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private SignUpService: SignUpService,
    private toastService: ToasterService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],

      lastName: ['', [Validators.required, Validators.minLength(3)]],

      company: ['', [Validators.required]],

      empId: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(8)]],

      confirmPassword: ['', Validators.required],

      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();

      return;
    }
    const signupData = this.signupForm.value;
    this.SignUpService.signup(signupData).subscribe({
      next: (response) => {
        this.toastService.showSuccess(response.message, 3000);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastService.showError(error.message, 3000);
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
