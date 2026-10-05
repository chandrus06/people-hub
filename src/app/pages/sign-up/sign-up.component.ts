import { Component } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
   templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private SignUpService: SignUpService
  ) {

    this.signupForm = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

        lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      company:[
        '',
        [
          Validators.required
        ]
      ],
         
      empId:[
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ],

      termsAccepted: [
        false,
        Validators.requiredTrue
      ]

    });
  }


  onSubmit(): void {

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;
    }
    console.log(this.signupForm.value);

    const signupData = this.signupForm.value;

    this.SignUpService.signup(signupData).subscribe({

      next: (response) => {

        console.log('Signup successful:', response);

        alert('Signup successful! Please login.');

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed:', error);

        alert('Signup failed. Please try again.');
      }
    });


  }


  goToLogin(): void {

    this.router.navigate(['/login']);

  }

}
