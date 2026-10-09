import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../core/guards/auth.service';
import { ApiService } from '../../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserModal = false;

  user: any = {};
  // {
  //   name: 'Pavithra Devi',
  //   empId: 'EMP001',
  //   email: 'pavithra@example.com',
  //   department: 'IT',
  //   role: 'Frontend Developer',
  //   companyname: 'Anrudix'
  // };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.apiService.getLoggedInUser().subscribe((response: any) => {
      this.user = response || {};

      if (!this.user) {
        this.user = localStorage.getItem('loggedInUser');
      }
    });
  }

  openUserModal() {
    this.showUserModal = true;
  }

  signOut() {
    this.showUserModal = false;
    this.authService.logout();
  }
}
