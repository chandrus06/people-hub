import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../core/guards/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserModal = false;

  user = {
    name: 'Pavithra Devi',
    empId: 'EMP001',
    email: 'pavithra@example.com',
    department: 'IT',
    role: 'Frontend Developer',
    companyname: 'Anrudix'
  };

  constructor(private authService: AuthService) {}

  openUserModal() {
    this.showUserModal = true;
  }

  signOut() {
    this.showUserModal = false;
    this.authService.logout();
  }
}
