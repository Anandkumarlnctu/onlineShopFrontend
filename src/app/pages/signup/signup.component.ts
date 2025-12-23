
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef<HTMLDivElement>;

  user = { name: '', email: '', password: '' };
  confirmPassword = '';
  error = '';
  success = '';
  passwordStrengthClass = '';  // 'weak' | 'medium' | 'strong'
  isPasswordStrong = false;

  readonly MIN_NAME_LEN = 2;
  readonly MAX_NAME_LEN = 50;
  readonly nameRegex = /^[A-Za-z][A-Za-z\s\-'’]{1,49}$/;  // letters, space, hyphen, apostrophe
  readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const google = (window as any).google;
    if (google?.accounts?.id && this.googleBtn?.nativeElement) {
      google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // <-- REPLACE with your OAuth Web Client ID
        callback: (response: any) => this.onGoogleCredential(response),
      });

      google.accounts.id.renderButton(this.googleBtn.nativeElement, {
        theme: 'filled_blue',   // blue button
        size: 'large',
        shape: 'rectangular',
        text: 'signup_with',
        logo_alignment: 'left',
        width: 220
      });

    } else {
      console.warn('Google Identity Services not loaded. Check the script in index.html and client_id.');
    }
  }

  private onGoogleCredential(response: any) {
    // response.credential is a JWT from Google.
    // TODO: POST to your backend: verify JWT, create/login user, handle duplicates (return 409)
    this.success = 'Google sign-in successful ✅';
    this.error = '';
  }

  appleSignup() {
    // Placeholder – Apple Sign-In requires Apple developer setup + server validation.
    // TODO: Implement full Apple Sign-In or link to your backend.
    this.success = 'Apple sign-up clicked. (Integrate Apple Sign-In to complete.)';
    this.error = '';
  }

  // Password strength: >=8 chars, upper+lower+digit+special recommended
  checkPasswordStrength() {
    const p = this.user.password ?? '';
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    const hasDigit = /\d/.test(p);
    const hasSpecial = /[!@#$%^&*()_+={}\[\]|\\;:'",.<>\?/-]/.test(p);

    const score = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;

    if (p.length < minLength || score < 2) {
      this.passwordStrengthClass = 'weak';
      this.isPasswordStrong = false;
    } else if (score === 3) {
      this.passwordStrengthClass = 'medium';
      this.isPasswordStrong = false;
    } else {
      this.passwordStrengthClass = 'strong';
      this.isPasswordStrong = true;
    }
  }

  private validateAllFields(): string | null {
    const nameTrim = this.user.name.trim();
    const emailTrim = (this.user.email || '').trim().toLowerCase();
    const password = this.user.password;

    if (!nameTrim || nameTrim.length < this.MIN_NAME_LEN || nameTrim.length > this.MAX_NAME_LEN) {
      return `Name must be ${this.MIN_NAME_LEN}-${this.MAX_NAME_LEN} characters.`;
    }
    if (!this.nameRegex.test(nameTrim)) {
      return 'Name can include letters, spaces, hyphens or apostrophes only.';
    }
    if (!emailTrim || !this.emailRegex.test(emailTrim)) {
      return 'Please enter a valid email address.';
    }
    if (!password || !this.isPasswordStrong) {
      return 'Please choose a stronger password (upper, lower, number, special, ≥ 8 chars).';
    }
    if (password !== this.confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  }

  signup() {
    this.error = '';
    this.success = '';

    const clientError = this.validateAllFields();
    if (clientError) {
      this.error = clientError;
      return;
    }

    const signupData = {
      username: this.user.name.trim(),
      email: this.user.email.trim().toLowerCase(),
      password: this.user.password
    };

   //dumy api
    this.http.post('https://dummyjson.com/users/add', signupData).subscribe({
      next: () => {
        this.success = 'Welcome to the Supermarket! ✅';
        this.error = '';
      },
      error: (err) => {
        console.error('Signup failed:', err);
        if (err?.status === 409) {
          this.error = 'User already registered ❌';
        } else {
          const apiMsg = err?.error?.message || err?.message;
          this.error = apiMsg ? `Signup failed: ${apiMsg}` : 'Signup failed ❌';
        }
        this.success = '';
      }
    });
  }
}
