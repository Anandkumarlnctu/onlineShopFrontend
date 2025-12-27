import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  email: string = '';
  isVerifying = false;
  isResending = false;

  // Timer for OTP expiry (5 minutes = 300 seconds)
  timeRemaining = 300;
  private timerInterval: any;

  // Resend cooldown (30 seconds)
  resendCooldown = 30;
  canResend = false;
  private resendInterval: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });

    // Get email from navigation state
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras?.state?.['email'] || '';

    if (!this.email) {
      // If no email, redirect to signup
      this.router.navigate(['/signup']);
    }
  }

  ngOnInit() {
    this.startTimer();
    this.startResendCooldown();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  startResendCooldown() {
    this.canResend = false;
    this.resendCooldown = 30;

    this.resendInterval = setInterval(() => {
      if (this.resendCooldown > 0) {
        this.resendCooldown--;
      } else {
        this.canResend = true;
        clearInterval(this.resendInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onVerify() {
    if (this.otpForm.valid) {
      this.isVerifying = true;

      const verifyData = {
        email: this.email,
        otp: this.otpForm.value.otp
      };

      this.authService.verifyOtp(verifyData).subscribe({
        next: (response) => {
          this.isVerifying = false;
          // Response is plain text string from backend
          alert(response || 'Email verified successfully! Redirecting to home page...');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isVerifying = false;
          const errorMessage = error.error || error.message || 'OTP verification failed. Please try again.';
          alert(errorMessage);
          this.otpForm.reset();
        }
      });
    }
  }

  onResendOtp() {
    this.isResending = true;

    const resendData = {
      email: this.email
    };

    this.authService.resendOtp(resendData).subscribe({
      next: (response) => {
        this.isResending = false;
        // Response is plain text string from backend
        alert(response || 'New OTP sent successfully!');

        // Reset timers
        this.timeRemaining = 300;
        this.startTimer();
        this.startResendCooldown();
        this.otpForm.reset();
      },
      error: (error) => {
        this.isResending = false;
        const errorMessage = error.error || error.message || 'Failed to resend OTP. Please try again.';
        alert(errorMessage);
      }
    });
  }
}
