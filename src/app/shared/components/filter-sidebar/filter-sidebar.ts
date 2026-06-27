import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { ProductFilters } from '../../interfaces/item.interface';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css'
})
export class FilterSidebarComponent {
  @Input() categories: Category[] = [];

  @Output() filtersApplied = new EventEmitter<ProductFilters>();

  productStates: string[] = [
    'Como nuevo',
    'Muy buen estado',
    'Buen estado',
    'Usado'
  ];

  onApplyFilters(
    category: string,
    maxPrice: string,
    location: string,
    status: string
  ): void {
    this.filtersApplied.emit({
      category,
      maxPrice,
      location,
      status
    });
  }

  onClearFilters(): void {
    this.filtersApplied.emit({});
  }
}