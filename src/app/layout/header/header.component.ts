import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ProgressBarModule,
    BadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  total = computed(() => this.cartService.cart().total);
  count = computed(() => this.cartService.cart().count);

  mobileSearchBox = false;
  constructor(private cartService: CartService) {}

  onLang(lang: string) {
    console.log('location: ', location);
    switch (lang) {
      case 'es':
        location.href = '/es-ES';
        break;
      case 'ar':
        location.href = '/ar-EG';
        break;
      case 'en':
      default:
        location.href = '/';
    }
  }
}
