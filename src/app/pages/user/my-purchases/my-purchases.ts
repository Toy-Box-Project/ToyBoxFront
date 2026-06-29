import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating';
import { AuthService } from '../../../core/services/auth.service';
import { ReviewsService } from '../../../core/services/reviews.service';
import { Review } from '../../../shared/interfaces/review.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    PaginationComponent,
    StarRatingComponent, BreadcrumbComponent
  ],
  templateUrl: './my-purchases.html',
  styleUrl: './my-purchases.css',
})
export class MyPurchasesComponent implements OnInit {
  private authService = inject(AuthService);
  private reviewsService = inject(ReviewsService);

  activeTab: 'purchases' | 'sales' = 'purchases';

  myPurchaseReviews: Review[] = [];
  mySalesReviews: Review[] = [];

  isLoading = false;
  errorMessage = '';
  currentPage = 1;
  pageSize = 6;

  ngOnInit(): void {
    this.loadReviews();
  }

  /**
   * Cargar reseñas del backend
   */
  private loadReviews(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      this.errorMessage = 'Debes estar autenticado para ver tus reseñas';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Cargar reseñas de compras (como comprador)
    this.reviewsService.getByReviewer(currentUser.id_users).subscribe({
      next: (reviews) => {
        this.myPurchaseReviews = reviews;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error cargando reseñas de compras:', err);
        this.handleError(err);
      }
    });

    // Cargar reseñas de ventas (como vendedor)
    this.reviewsService.getBySeller(currentUser.id_users).subscribe({
      next: (reviews) => {
        this.mySalesReviews = reviews;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error cargando reseñas de ventas:', err);
        this.handleError(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Manejar errores de las peticiones
   */
  private handleError(err: HttpErrorResponse): void {
    if (err.status === 0) {
      this.errorMessage = 'No hay conexión con el servidor';
    } else if (err.status === 401) {
      this.errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente';
    } else if (err.status === 403) {
      this.errorMessage = 'No tienes permiso para ver estas reseñas';
    } else if (err.status === 404) {
      this.errorMessage = 'No se encontraron reseñas';
    } else {
      this.errorMessage = err.error?.message || 'Error al cargar las reseñas. Intenta de nuevo.';
    }
  }

  /**
   * Cambiar entre pestañas de compras y ventas
   */
  switchTab(tab: 'purchases' | 'sales'): void {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  /**
   * Obtener reseñas paginadas según la pestaña activa
   */
  get paginatedReviews(): Review[] {
    const list = this.activeTab === 'purchases'
      ? this.myPurchaseReviews
      : this.mySalesReviews;

    const start = (this.currentPage - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  }

  /**
   * Obtener el número total de páginas
   */
  get totalPages(): number {
    const list = this.activeTab === 'purchases'
      ? this.myPurchaseReviews
      : this.mySalesReviews;

    return Math.ceil(list.length / this.pageSize);
  }

  /**
   * Manejar cambio de página
   */
  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
