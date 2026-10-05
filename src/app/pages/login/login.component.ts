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
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
      return;
    }

    const registeredUser = localStorage.getItem('user');
    

    if (!registeredUser) {
       alert('No registered user found. Please signup first.'); 
        return; }
     
       const loginEmail = this.loginForm.get('email')?.value; 
      const loginPassword = this.loginForm.get('password')?.value;
    
       const Signup = JSON.parse(registeredUser);
    
     if ( loginEmail === Signup.email &&
       loginPassword === Signup.password )   { 
        localStorage.setItem( 'loggedInUser', JSON.stringify(Signup) );
      alert('Login successful!');  
      this.router.navigate(['/dashboard']); }
      else { 
       alert('Invalid email or password'); } }

  gotoSignup():void{
    this.router.navigate(['/signup']);
  }

  
}
