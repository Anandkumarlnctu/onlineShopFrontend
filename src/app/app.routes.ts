import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { OtpVerificationComponent } from './pages/otp-verification/otp-verification.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verify-otp', component: OtpVerificationComponent },
    { path: 'login', component: LoginComponent },
    { canActivate: [authGuard], path: 'products', component: ProductsComponent },
    { canActivate: [authGuard], path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) }
];
