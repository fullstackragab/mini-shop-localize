import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './pages/search/search.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
];
