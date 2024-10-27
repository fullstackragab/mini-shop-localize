import { Component, Input } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { Product } from '../../data/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    TruncatePipe,
    CardModule,
    RouterLink,
    ButtonModule,
    OverlayPanelModule,
    CommonModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showLinks = false;
  @Input() showTitle = false;
  @Input() showTags = false;

  constructor(private cartService: CartService) {}

  onAddToCart() {
    this.cartService.addItem({
      id: this.product.id,
      imageUrl: this.product.imageUrl,
      name: this.product.title,
      price: this.product.price,
      quantity: 1,
    });
  }
}
