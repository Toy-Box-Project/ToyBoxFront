import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';

import { ProductsService } from '../../../core/services/products.service';
import { OrdersService } from '../../../core/services/orders.service';
import { ReviewsService } from '../../../core/services/reviews.service';
import { AuthService } from '../../../core/services/auth.service';

import { Item, ItemCard } from '../../../shared/interfaces/item.interface';
import { ItemHistory } from '../../../shared/interfaces/item-history.interface';
import { Review } from '../../../shared/interfaces/review.interface';
import { ItemStatus } from '../../../shared/enums/item-status.enum';
import { TradeStatus } from '../../../shared/enums/trade-status.enum';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule,RouterModule,PaginationComponent,LoadingSpinnerComponent,StatusBadgeComponent,StarRatingComponent,
    ModalConfirmComponent,EmptyStateComponent, BreadcrumbComponent],
  templateUrl: './my-products.html',
  styleUrl: './my-products.css',
})
export class MyProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly ordersService = inject(OrdersService);
  private readonly reviewsService = inject(ReviewsService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  products: Item[] = [];
  isLoadingProducts = true;
  productsError = '';
  currentPage = 1;
  totalPages = 1;

  sales: ItemHistory[] = [];
  isLoadingSales = true;
  salesError = '';

  receivedReviews: Review[] = [];
  isLoadingReviews = true;
  reviewsError = '';

  productToDelete: Item | null = null;
  showDeleteModal = false;

  currentUserId: number | undefined;

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.currentUserId = user.id_users;
      this.loadAllData();
    } else {
      this.productsError = 'No hay usuario autenticado';
    }
  }

  private loadAllData(): void {
    this.loadMyProducts();
    this.loadMySales();
    this.loadReceivedReviews();
  }

  private loadMyProducts(): void {
    this.isLoadingProducts = true;
    this.productsError = '';

    if (!this.currentUserId) return;

    this.productsService.getAll({ sellerId: this.currentUserId }).subscribe({
      next: (response) => {
        this.totalPages = response.totalPages || 1;
        this.products = (response.items || []).map((card: ItemCard) => ({
          id_items: card.id_items,
          title: card.title,
          description: null,
          price: card.price,
          conservation_status: card.conservation_status,
          item_status: card.item_status,
          location: card.location,
          publication_date: card.publication_date,
          fk_seller_id: this.currentUserId ?? 0,
          fk_categories_id: 0,
          item_update: null,
          images: card.image ? [{ id_photos: 0, photo_url: card.image, order: 0, fk_items_id: card.id_items }] : []
        } as Item));
        this.isLoadingProducts = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
        this.productsError = 'Error al cargar los productos. Intenta de nuevo.';
        this.isLoadingProducts = false;
        this.cdr.markForCheck();
      }
    });
  }

  private loadMySales(): void {
    this.isLoadingSales = true;
    this.salesError = '';

    this.ordersService.getMySales().subscribe({
      next: (sales) => {
        this.sales = sales;
        this.isLoadingSales = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando ventas:', err);
        this.salesError = 'Error al cargar las ventas. Intenta de nuevo.';
        this.isLoadingSales = false;
        this.cdr.markForCheck();
      }
    });
  }

  private loadReceivedReviews(): void {
    this.isLoadingReviews = true;
    this.reviewsError = '';

    if (!this.currentUserId) return;

    this.reviewsService.getBySeller(this.currentUserId).subscribe({
      next: (reviews) => {
        this.receivedReviews = reviews;
        this.isLoadingReviews = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando reseñas:', err);
        this.reviewsError = 'Error al cargar las reseñas. Intenta de nuevo.';
        this.isLoadingReviews = false;
        this.cdr.markForCheck();
      }
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/product/edit', id]);
  }

  markAsSold(id: number): void {
    if (!this.currentUserId) return;

    this.productsService.markAsSold(id).subscribe({
      next: () => {
        this.products = this.products.map(p =>
          p.id_items === id ? { ...p, item_status: ItemStatus.Sold } : p
        );
      },
      error: (err) => {
        console.error('Error marcando producto como vendido:', err);
      }
    });
  }

  confirmDelete(product: Item): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  deleteProductConfirmed(): void {
    if (!this.productToDelete) return;

    this.productsService.delete(this.productToDelete.id_items).subscribe({
      next: () => {
        this.products = this.products.filter(
          p => p.id_items !== this.productToDelete!.id_items
        );
        this.showDeleteModal = false;
        this.productToDelete = null;
      },
      error: (err) => {
        console.error('Error eliminando producto:', err);
      }
    });
  }

  getAverageRating(): number {
    if (this.receivedReviews.length === 0) return 0;
    const sum = this.receivedReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.receivedReviews.length;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.productsService.getAll({ sellerId: this.currentUserId, page }).subscribe({
      next: (response) => {
        this.totalPages = response.totalPages || 1;
        this.products = (response.items || []).map((card: ItemCard) => ({
          id_items: card.id_items,
          title: card.title,
          description: null,
          price: card.price,
          conservation_status: card.conservation_status,
          item_status: card.item_status,
          location: card.location,
          publication_date: card.publication_date,
          fk_seller_id: this.currentUserId ?? 0,
          fk_categories_id: 0,
          item_update: null,
          images: card.image ? [{ id_photos: 0, photo_url: card.image, order: 0, fk_items_id: card.id_items }] : []
        } as Item));
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  mapItemStatus(status: ItemStatus): 'available' | 'reserved' | 'sold' | 'new' | 'used' | 'featured' {
    switch (status) {
      case ItemStatus.Available:
        return 'available';
      case ItemStatus.Sold:
        return 'sold';
      case ItemStatus.Paused:
        return 'reserved';
      case ItemStatus.Deleted:
        return 'featured';
      default:
        return 'available';
    }
  }

  mapTradeStatus(status: TradeStatus): 'available' | 'reserved' | 'sold' | 'new' | 'used' | 'featured' {
    switch (status) {
      case TradeStatus.Pending:
        return 'reserved';
      case TradeStatus.Done:
        return 'sold';
      case TradeStatus.Cancelled:
        return 'featured';
      default:
        return 'available';
    }
  }
}
