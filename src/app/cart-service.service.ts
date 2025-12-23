
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private apiUrl = 'http://localhost:9090/cart'; // Your backend API endpoint

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addItem(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/add`, item);
  }

  removeItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${itemId}`);
  }

  updateItem(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/update`, item);
  }

  // clearCart(): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/clear`);
  // }

  getTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
