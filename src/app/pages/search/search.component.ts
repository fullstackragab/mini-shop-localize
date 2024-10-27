import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { first } from 'rxjs';
import { Product } from '../../data/product';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    FilterComponent,
    ButtonModule,
    DialogModule,
    DividerModule,
    ProductCardComponent,
    LoadingComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  isMobile = false;
  total: number = 0;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.isLoading = true;
    let obj = {};
    this.productsService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (r: any) => {
          this.isLoading = false;
          this.products = r;
          this.total = r.length;
        },
        error: (e: any) => {
          this.isLoading = false;
        },
      });
  }
}
