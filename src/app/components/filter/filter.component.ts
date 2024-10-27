import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

export interface Filter {
  title: string;
  description: string;
  categories: number[];
}

export const EmptyFilter: Filter = {
  title: '',
  description: '',
  categories: [],
};

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CheckboxModule,
    DividerModule,
    TreeModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  filterObj: Filter = { ...EmptyFilter };
  @Output() filter = new EventEmitter<Filter>();
  @Output() close = new EventEmitter<void>();
  categories: any[] = [];
  selectedCategories: any;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onCategoryChange() {
    this.filterObj.categories = this.selectedCategories?.map((t: any) => t.key);
    this.filter.next(this.filterObj);
  }

  onDone() {
    this.close.next();
  }

  onClearTitle() {
    (this.filterObj.title = ''), this.filter.next(this.filterObj);
  }

  onClearDescription() {
    (this.filterObj.description = ''), this.filter.next(this.filterObj);
  }

  onClearCategories() {
    (this.filterObj.categories = []), this.filter.next(this.filterObj);
  }

  onClearFilter() {
    this.selectedCategories = undefined;
    this.filterObj = { ...EmptyFilter };
    this.filter.next(this.filterObj);
  }
}
