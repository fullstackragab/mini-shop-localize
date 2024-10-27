import { Component, computed } from '@angular/core';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart.service';
import { loadStripe } from '@stripe/stripe-js/pure';
import { environment } from '../../../environments/environment';
import { ProductsService } from '../../services/products.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemCardComponent, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  count = computed(() => this.cartService.cart().count);
  total = computed(() => this.cartService.cart().total);
  items = computed(() => this.cartService.cart().items);

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  onItemQuantityUpdate(quantity: number, id: number) {
    let increase = true;
    const item = this.items().find((t) => t.id === id);
    if (quantity < item!.quantity) increase = false;
    if (increase) {
      this.cartService.increaseItem(item!);
    } else {
      this.cartService.decreaseItem(item!);
    }
  }

  onRemoveItem(id: number) {
    const item = this.items().find((t) => t.id === id);
    this.cartService.removeItem(item!);
  }

  async onCheckout() {
    const stripe = await loadStripe(environment.STRIPE_PK);
    const cartItems = this.cartService
      .cart()
      .items.map((item) => ({ id: item.id, quantity: item.quantity }));
    this.productsService
      .checkout(cartItems)
      .pipe(first())
      .subscribe({
        next: async (response) => {
          const session = response as any;

          const result = await stripe?.redirectToCheckout({
            sessionId: session.id,
          });

          if (result?.error) {
            console.log(result?.error);
          }
        },
        error: (response) => {
          if (response?.error) {
            console.log(response?.error);
          }
        },
      });
  }
}
