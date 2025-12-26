// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Custom CSS for Navbar
})
export class NavbarComponent {
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  constructor(public cart: CartService, private router: Router) {
    // Check if the user is logged in by checking localStorage
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  // Handle search query submit
  onSearch() {
    if (this.searchQuery.trim()) {
      // Redirect to the search results page with the query as a parameter
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  // Logout function
  logout() {
    // Clear localStorage or token to log the user out
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
