import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ItemCard } from '../../shared/interfaces/item.interface';
import { Category } from '../../shared/interfaces/category.interface';

// Shape local que usa el template (track cat.id, product.photo_url)
interface LocalProduct {
  id: number;
  title: string;
  price: number;
  description: string | null;
  photo_url: string;
  isFavorite?: boolean;
}

interface LocalCategory {
  id: number;
  name: string;
  icon: string;
}

interface Filters {
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  sortBy: string;
}

const CATEGORY_ICONS: Record<number, string> = {
  1: 'assets/images/Iconos categorias/icono_munecosycoches.svg',
  2: 'assets/images/Iconos categorias/icono_construccion.svg',
  3: 'assets/images/Iconos categorias/icono_juegosmesa.svg',
  4: 'assets/images/Iconos categorias/icono_educativo.svg',
  5: 'assets/images/Iconos categorias/icono_bebes.svg',
  6: 'assets/images/Iconos categorias/icono_airelibre.svg',
  7: 'assets/images/Iconos categorias/icono_imaginacion.svg',
  8: 'assets/images/Iconos categorias/icono_videojuegos.svg',
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  searchQuery = '';
  showFilters = false;
  selectedCategory: number | null = null;
  currentPage = 1;
  hasNextPage = false;
  pageSize = 12;

  filters: Filters = {
    category: '',
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    condition: '',
    sortBy: 'date_desc'
  };

  categories: LocalCategory[] = [];
  featuredProduct: LocalProduct | null = null;
  latestProducts: LocalProduct[] = [];
  relatedProducts: LocalProduct[] = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Lanzar categorías y productos en paralelo (una sola llamada a /products)
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: (cats: Category[]) => {
        this.categories = cats.map(c => ({
          id:   c.id_categories,
          name: c.name,
          icon: CATEGORY_ICONS[c.id_categories] ?? 'assets/images/Iconos categorias/icono_educativo.svg',
        }));
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.cdr.markForCheck();
      },
    });
  }

  /** Una sola llamada a /products sustituye las dos anteriores (latestProducts + relatedProducts) */
  loadProducts(): void {
    const filters: any = { limit: this.pageSize, page: this.currentPage };
    if (this.selectedCategory) filters.categoryId = this.selectedCategory;
    if (this.searchQuery.trim()) filters.search = this.searchQuery.trim();

    this.productsService.getAll(filters).subscribe({
      next: (res) => {
        this.relatedProducts = res.items.map(this.toLocalProduct);
        // Los primeros 4 se usan como "últimos productos" y featured
        this.latestProducts  = this.relatedProducts.slice(0, 4);
        this.featuredProduct = this.latestProducts[0] ?? null;
        this.hasNextPage     = this.currentPage < res.totalPages;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
        this.cdr.markForCheck();
      },
    });
  }

  /** @deprecated Eliminado — lógica fusionada en loadProducts() */
  loadLatestProducts(): void { this.loadProducts(); }

  /** @deprecated Eliminado — lógica fusionada en loadProducts() */
  loadRelatedProducts(): void { this.loadProducts(); }

  private toLocalProduct(card: ItemCard): LocalProduct {
    return {
      id:          card.id_items,
      title:       card.title,
      price:       card.price,
      description: null,
      photo_url:   card.image,
    };
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.currentPage = 1;
      this.loadProducts();
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  selectCategory(categoryId: number): void {
    this.selectedCategory = this.selectedCategory === categoryId ? null : categoryId;
    this.currentPage = 1;
    this.loadProducts();
  }

  toggleFavorite(product: LocalProduct): void {
    product.isFavorite = !product.isFavorite;
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadProducts();
    }
  }
}
