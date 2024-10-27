import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Cart>({
    items: [],
    count: 0,
    total: 0,
  });

  constructor(private http: HttpClient) {}

  addItem(item: CartItem) {
    const itemObj = this.cart().items.find((t) => t.id === item.id);
    if (itemObj) {
      this.increaseItem(itemObj);
    } else {
      this.cart.update((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items, item],
        count: prevCart.count + 1,
        total: this.roundNumber(+prevCart.total + +item.price),
      }));
    }
  }

  roundNumber(v: number) {
    return Math.round((v + Number.EPSILON) * 100) / 100;
  }

  increaseItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items],
      };
      const itemObj = newCart.items.find((t) => t.id === item.id);
      itemObj!.quantity = +itemObj!.quantity + 1;
      newCart.count++;
      newCart.total += +itemObj!.price;
      newCart.total = this.roundNumber(+newCart.total);
      return newCart;
    });
  }

  decreaseItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items],
      };
      const itemObj = newCart.items.find((t) => t.id === item.id);
      itemObj!.quantity = +itemObj!.quantity - 1;
      newCart.count--;
      newCart.total -= +itemObj!.price;
      newCart.total = this.roundNumber(+newCart.total);
      return newCart;
    });
  }

  removeItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items.filter((t) => t.id !== item.id)],
      };
      const itemObj = prevCart.items.find((t) => t.id === item.id);
      newCart.count -= +itemObj!.quantity;
      newCart.total -= +itemObj!.price * +itemObj!.quantity;
      newCart.total = this.roundNumber(+newCart.total);
      return newCart;
    });
  }

  clear() {
    this.cart.set({
      items: [],
      count: 0,
      total: 0,
    });
  }
}

export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  count: number;
  total: number;
}
