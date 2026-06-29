import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../shared/interfaces/category.interface';
import { ItemCard, Itemfilters } from '../../shared/interfaces/item.interface';

// Shape que usa app-product-card (@Input product: DemoProduct)
interface CatalogProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  status: string;
  image: string;
  badge: string;
}

const CATEGORY_ICONS: Record<number, string> = {
  1: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
  2: '/assets/images/Iconos%20categorias/icono_construccion.svg',
  3: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg',
  4: '/assets/images/Iconos%20categorias/icono_educativo.svg',
  5: '/assets/images/Iconos%20categorias/icono_bebes.svg',
  6: '/assets/images/Iconos%20categorias/icono_airelibre.svg',
  7: '/assets/images/Iconos%20categorias/icono_imaginacion.svg',
  8: '/assets/images/Iconos%20categorias/icono_videojuegos.svg',
};

const STATUS_LABELS: Record<string, string> = {
  draft:        'Borrador',
  published:    'Publicado',
  under_review: 'En revisión',
  removed:      'Retirado',
  sold:         'Vendido',
};

const BADGE_LABELS: Record<string, string> = {
  available: 'Disponible',
  sold:      'Vendido',
  paused:    'Pausado',
  deleted:   'Eliminado',
};

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, SearchBarComponent, FilterSidebarComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  searchTerm = '';
  activeFilters: Itemfilters = {};

  categories: Category[] = [];
  products: CatalogProduct[] = [];

  isLoading = false;
  error = '';

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: (cats: Category[]) => {
        this.categories = [
          { id_categories: 0, name: 'Todas', description: null },
          ...cats.map(c => ({ ...c, icon: CATEGORY_ICONS[c.id_categories] ?? '' })),
        ];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.cdr.markForCheck();
      },
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = '';

    const filters: Itemfilters = { ...this.activeFilters };
    if (this.searchTerm.trim()) filters.search = this.searchTerm.trim();

    this.productsService.getAll(filters).subscribe({
      next: (res) => {
        this.products = res.items.map(this.toCardProduct);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Error al cargar los productos. Verifica que el servidor esté activo.';
        this.isLoading = false;
        console.error('Error cargando catálogo:', err);
        this.cdr.markForCheck();
      },
    });
  }

  private toCardProduct(card: ItemCard): CatalogProduct {
    return {
      id:       card.id_items,
      title:    card.title,
      category: card.category?.name ?? 'Sin categoría',
      price:    card.price,
      location: card.location,
      status:   STATUS_LABELS[card.conservation_status] ?? card.conservation_status,
      image:    card.image || '/assets/images/Iconos%20categorias/icono_educativo.svg',
      badge:    BADGE_LABELS[card.item_status] ?? card.item_status,
    };
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.loadProducts();
  }

  onFiltersApplied(filters: Itemfilters): void {
    this.activeFilters = filters;
    this.loadProducts();
  }
}
