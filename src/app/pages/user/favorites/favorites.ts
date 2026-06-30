import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { FavoritesService } from '../../../core/services/favorites.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';
import { AuthService } from '../../../core/services/auth.service';

// Interfaz local para product-card
interface DemoProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  status: string;
  image: string;
  badge: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,RouterModule,ProductCardComponent,PaginationComponent, BreadcrumbComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService); 

  favorites: DemoProduct[] = [];
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  breadcrumbItems: any[] = []; 

  showConfirmModal = false;
  selectedFavoriteId: number | null = null;

  isLoading = false;
  backendError = '';
  backendSuccess = '';

  ngOnInit(): void {
    this.initializeBreadcrumbs();
    // this.loadFavorites();
      // Datos de prueba mientras el backend no esté listo
  this.favorites = [
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },{
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },{
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    },
    {
      id: 1,
      title: 'LEGO Star Wars',
      category: 'Construcción',
      price: 25,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/placeholder.jpg',
      badge: 'Guardado'
    }

  ];
  this.isLoading = false; 
  this.updatePagination();
  }

  private initializeBreadcrumbs(): void {
    const isLoggedIn = this.authService.isLoggedIn();
    const homeRoute = isLoggedIn ? '/catalog' : '/home';

    this.breadcrumbItems = [
      { label: 'Inicio', route: homeRoute, icon: 'home' },
      { label: 'Mis Favoritos', icon: 'favorite' }
    ];
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.backendError = '';

    this.favoritesService.getMyFavorites().subscribe({
      next: (response: any) => {
        this.favorites = response.map((item: any) => ({
          id: item.id_items,
          title: item.title,
          category: item.category || 'Sin categoría',
          price: item.price,
          location: item.location,
          status: this.getStatusText(item.conservation_status),
          image: item.main_photo || '/assets/images/Iconos%20categorias/icono_educativo.svg',
          badge: 'Guardado'
        })) as DemoProduct[];

        this.updatePagination();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.handleError(err, 'Error al cargar favoritos');
        console.error('Error cargando favoritos:', err);
        this.cdr.markForCheck();
      }
    });
  }

  private getStatusText(conservationStatus: string): string {
    const statusMap: { [key: string]: string } = {
      'excellent': 'Excelente estado',
      'very_good': 'Muy buen estado',
      'good': 'Buen estado',
      'fair': 'Estado aceptable',
      'poor': 'Necesita reparación'
    };
    return statusMap[conservationStatus] || conservationStatus || 'Buen estado';
  }

  private handleError(err: HttpErrorResponse, defaultMessage: string): void {
    if (err.status === 401) {
      this.backendError = 'Debes iniciar sesión para ver tus favoritos';
    } else if (err.status === 0) {
      this.backendError = 'Error de conexión. Verifica que el servidor esté corriendo';
    } else {
      this.backendError = err.error?.error || defaultMessage;
    }
  }

  get totalFavorites(): number {
    return this.favorites.length;
  }

  get paginatedFavorites(): DemoProduct[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.favorites.slice(start, start + this.pageSize);
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.favorites.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  requestRemoveFavorite(productId: number): void {
    this.selectedFavoriteId = productId;
    this.showConfirmModal = true;
  }

  cancelRemove(): void {
    this.showConfirmModal = false;
    this.selectedFavoriteId = null;
  }

  confirmRemove(): void {
    if (!this.selectedFavoriteId) return;

    this.favoritesService.remove(this.selectedFavoriteId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.id !== this.selectedFavoriteId);
        this.updatePagination();
        this.backendSuccess = 'Juguete eliminado de favoritos';

        setTimeout(() => {
          this.backendSuccess = '';
        }, 3000);

        this.showConfirmModal = false;
        this.selectedFavoriteId = null;
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err, 'Error al eliminar de favoritos');
        console.error('Error eliminando favorito:', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
