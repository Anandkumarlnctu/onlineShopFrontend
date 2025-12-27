import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface UserProfile {
    name: string;
    email: string;
    mobileNumber: string;
}

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: UserProfile | null = null;
    isLoading = true;
    error: string | null = null;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        this.isLoading = true;
        this.error = null;

        this.authService.getProfile().subscribe({
            next: (data) => {
                this.user = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load profile', err);
                // Fallback or error message
                this.error = 'Failed to load profile. Please check your connection.';
                this.isLoading = false;

                // DEV ONLY: Fallback mock data if backend unavailable
                // this.user = {
                //   name: 'John Doe',
                //   email: 'john@example.com',
                //   mobileNumber: '9876543210'
                // };
                // this.error = null;
            }
        });
    }

    getInitials(name: string): string {
        if (!name) return '';
        return name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }
}
