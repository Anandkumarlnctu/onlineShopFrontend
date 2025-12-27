import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;

            const loginData = this.loginForm.value;

            this.authService.login(loginData).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    // Response is JWT token as plain text
                    alert('Login successful! Redirecting to products...');

                    // Navigate to products page
                    this.router.navigate(['/products']);
                },
                error: (error) => {
                    this.isLoading = false;
                    const errorMessage = error.error || error.message || 'Login failed. Please check your credentials.';
                    alert(errorMessage);
                }
            });
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.loginForm.controls).forEach(key => {
                this.loginForm.get(key)?.markAsTouched();
            });
        }
    }
}
