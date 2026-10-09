import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ApiService } from '../../app.service';
import { AuthService } from '../../core/guards/auth.service';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    ToastModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  registeredUser: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private toastService: ToasterService
  ) {
    this.loginForm = this.fb.group({
      empId: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const loginData = {
        empId: this.loginForm.value.empId,
        password: this.loginForm.value.password
      };

      this.authService.loginUser(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Token is already saved in AuthService
          this.toastService.showSuccess('Login successful!', 3000);
          this.apiService.setLoggedInUser(response.user);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.showError(error.error?.message || 'Invalid employee ID or password');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  gotoSignup(): void {
    this.router.navigate(['/signup']);
  }
}
