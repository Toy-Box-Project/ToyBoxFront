import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [ CommonModule, RouterModule, NavbarComponent, FooterComponent, PaginationComponent, StarRatingComponent ],
  templateUrl: './my-purchases.html',
  styleUrl: './my-purchases.css',
})
export class MyPurchasesComponent implements OnInit {

  activeTab: 'purchases' | 'sales' = 'purchases';

  myPurchaseReviews: any[] = [];
  mySalesReviews: any[] = [];

  currentPage = 1;
  pageSize = 6;

  ngOnInit(): void {

    /*
    ============================================================
    BACKEND REAL (Node + Express + MySQL - db_toybox
    ============================================================

    this.reviewService.getMyPurchaseReviews(userId).subscribe(res => {
      this.myPurchaseReviews = res;
    });

    this.reviewService.getMySalesReviews(userId).subscribe(res => {
      this.mySalesReviews = res;
    });
    */

    // DEMO— 7 reseñas de compras
    this.myPurchaseReviews = [
      { id: 1, product_title: 'Robot educativo', rating: 5, comment: 'Muy buen vendedor.', date: '2026-05-12', product_image: '/assets/images/demo6.jpg' },
      { id: 2, product_title: 'Puzzle 500 piezas', rating: 4, comment: 'Llegó rápido.', date: '2026-04-20', product_image: '/assets/images/demo3.jpg' },
      { id: 3, product_title: 'Set de pinturas', rating: 5, comment: 'Perfecto estado.', date: '2026-03-10', product_image: '/assets/images/demo5.jpg' },
      { id: 4, product_title: 'Libro infantil', rating: 4, comment: 'Muy buen trato.', date: '2026-02-01', product_image: '/assets/images/demo7.jpg' },
      { id: 5, product_title: 'Coche teledirigido', rating: 5, comment: 'Todo genial.', date: '2026-01-15', product_image: '/assets/images/demo1.jpg' },
      { id: 6, product_title: 'Muñeca articulada', rating: 3, comment: 'Bien, pero tardó.', date: '2025-12-10', product_image: '/assets/images/demo2.jpg' },
      { id: 7, product_title: 'Juego de mesa', rating: 5, comment: 'Muy divertido.', date: '2025-11-05', product_image: '/assets/images/demo9.jpg' }
    ];

    // DEMO — 7 reseñas de ventas
    this.mySalesReviews = [
      { id: 10, product_title: 'Coche teledirigido', rating: 5, comment: 'Mi hijo encantado.', date: '2026-05-14', product_image: '/assets/images/demo1.jpg' },
      { id: 11, product_title: 'Set de pinturas', rating: 4, comment: 'Todo correcto.', date: '2026-02-16', product_image: '/assets/images/demo5.jpg' },
      { id: 12, product_title: 'Robot educativo', rating: 5, comment: 'Muy útil.', date: '2026-01-12', product_image: '/assets/images/demo6.jpg' },
      { id: 13, product_title: 'Libro infantil', rating: 4, comment: 'Buen estado.', date: '2025-12-02', product_image: '/assets/images/demo7.jpg' },
      { id: 14, product_title: 'Puzzle 500 piezas', rating: 5, comment: 'Perfecto.', date: '2025-11-20', product_image: '/assets/images/demo3.jpg' },
      { id: 15, product_title: 'Juego de mesa', rating: 3, comment: 'Bien, pero usado.', date: '2025-10-10', product_image: '/assets/images/demo9.jpg' },
      { id: 16, product_title: 'Camión de bomberos', rating: 5, comment: 'Muy buen vendedor.', date: '2025-09-01', product_image: '/assets/images/demo8.jpg' }
    ];
  }

  switchTab(tab: 'purchases' | 'sales') {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  get paginatedReviews() {
    const list = this.activeTab === 'purchases'
      ? this.myPurchaseReviews
      : this.mySalesReviews;

    const start = (this.currentPage - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  }

  get totalPages() {
    const list = this.activeTab === 'purchases'
      ? this.myPurchaseReviews
      : this.mySalesReviews;

    return Math.ceil(list.length / this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
