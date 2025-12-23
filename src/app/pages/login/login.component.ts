import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],   // ✅ REQUIRED
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => console.log('Login successful', res),
      error: (err) => console.error('Login failed', err)
    });
  }
}

