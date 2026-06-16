import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class PaginationComponent {

  @Input() currentPage = 1;

  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  previous(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  next(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  goTo(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

}