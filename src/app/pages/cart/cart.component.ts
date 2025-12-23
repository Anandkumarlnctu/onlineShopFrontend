
/*import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../cart-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isLoggedIn = false;
  totalPrice = 0;
  loading = false;
  error = '';

  constructor(private cartService: CartServiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadCart();
    }
  }

  loadCart(): void {
    this.loading = true;
    this.error = '';
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items ?? [];
        this.totalPrice = this.cartService.getTotalPrice(this.cartItems);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
        this.error = 'Failed to load cart. Please try again.';
        this.loading = false;
      }
    });
  }

  removeItem(itemId: number): void {
    this.loading = true;
    this.cartService.removeItem(itemId).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Failed to remove item:', err);
        this.error = 'Failed to remove item. Please try again.';
        this.loading = false;
      }
    });
  }

  clearCart(): void {
    this.loading = true;
    this.cartService.clearCart().subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Failed to clear cart:', err);
        this.error = 'Failed to clear cart. Please try again.';
        this.loading = false;
      }
    });
  }

  // Optional: update quantity if your API supports it
  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) return;
    this.loading = true;
    this.cartService.updateItemQuantity(itemId, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Failed to update quantity:', err);
        this.error = 'Failed to update quantity. Please try again.';
        this.loading = false;
      }
    });
  }

  // For *ngFor performance
  trackByItemId = (_: number, item: any) => item.id;
}
*/