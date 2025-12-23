
/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { of } from 'rxjs';

// Stub services
class CartServiceStub {
  getCartItems() { return of([]); }
  getTotalPrice(items: any[]) { return 0; }
  removeItem(id: number) { return of(null); }
  clearCart() { return of(null); }
  updateItemQuantity(id: number, qty: number) { return of(null); }
}
class AuthServiceStub {
  isLoggedIn() { return true; }
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: CartServiceService, useClass: CartServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart on init when logged in', () => {
    expect(component.isLoggedIn).toBeTrue();
    expect(component.cartItems).toEqual([]);
    expect(component.totalPrice).toBe(0);
  });
});
``
*/