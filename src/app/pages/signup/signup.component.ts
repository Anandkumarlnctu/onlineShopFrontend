import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitting = false;
  error = '';
  success = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z][A-Za-z\s\-’']{1,49}$/)
        ]
      ],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
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
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\;:'",.<>\?/\-]).{8,}$/)
        ]
      ]
    });
  }
  get name() { return this.signupForm.get('name'); }
  get mobileNumber() { return this.signupForm.get('mobileNumber'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  signUp(): void {
    this.error = '';
    this.success = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.error = 'Please fix validation errors and try again.';
      return;
    }

    this.isSubmitting = true;

    const payload = this.signupForm.value;

    this.authService.signUp(payload).subscribe({
      next: (res) => {
        this.success = 'Please verify your email.';
        
        localStorage.setItem('email', this.email?.value);

        this.signupForm.reset();

        setTimeout(() => {
          this.router.navigate(['otp']);
        }, 2000);
      },
      error: (err) => {
        console.error('Signup error:', err);
        const apiMsg = err?.error?.message || err?.message;
        this.error = apiMsg ? `Signup failed: ${apiMsg}` : 'Signup failed ❌';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
