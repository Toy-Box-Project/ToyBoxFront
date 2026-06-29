import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// DEMO - use interface ItemCard o Item
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  photo_url: string;
  isFavorite?: boolean;
}
// INTERFACE LOCAL
interface Category {
  id: number;
  name: string;
  icon: string;
}
// INTERFACE LOCAL
interface Filters {
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  sortBy: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  searchQuery: string = '';
  showFilters: boolean = false;
  selectedCategory: number | null = null;
  currentPage: number = 1;
  hasNextPage: boolean = true;
  pageSize: number = 12;

  filters: Filters = {
    category: '',
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    condition: '',
    sortBy: 'date_desc'
  };

  categories: Category[] = [
    { id: 1, name: 'Videojuegos y consolas', icon: 'assets/images/Iconos categorias/icono_videojuegos.svg' },
    { id: 2, name: 'Construcciones y bloques', icon: 'assets/images/Iconos categorias/icono_construccion.svg' },
    { id: 3, name: 'Muñecos y figuras', icon: 'assets/images/Iconos categorias/icono_munecosycoches.svg' },
    { id: 4, name: 'Puzzles y rompecabezas', icon: 'assets/images/Iconos categorias/icono_juegosmesa.svg' },
    { id: 5, name: 'Juegos de mesa y cartas', icon: 'assets/images/Iconos categorias/icono_imaginacion.svg' },
    { id: 6, name: 'Educativos y preescolar', icon: 'assets/images/Iconos categorias/icono_educativo.svg' },
    { id: 7, name: 'Vehículos y circuitos', icon: 'assets/images/Iconos categorias/icono_airelibre.svg' },
    { id: 8, name: 'Arte y manualidades', icon: 'assets/images/Iconos categorias/icono_bebes.svg' }
  ];

  featuredProduct: Product | null = null;
  latestProducts: Product[] = [];
  relatedProducts: Product[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadLatestProducts();
    this.loadRelatedProducts();
  }

  loadLatestProducts(): void {
    // DEMO
    this.latestProducts = [
      { id: 1, title: 'Osito de peluche', price: 10.99, description: 'En perfecto estado', photo_url: '' },
      { id: 2, title: 'Coche teledirigido', price: 25.00, description: 'Como nuevo', photo_url: '' },
      { id: 3, title: 'Puzzle 500 piezas', price: 8.50, description: 'Completo', photo_url: '' },
    ];
    this.featuredProduct = this.latestProducts[0];
  }

  loadRelatedProducts(): void {
    // DEMO
    this.relatedProducts = Array(12).fill(null).map((_, i) => ({
      id: i + 10,
      title: 'Juguete ' + (i + 1),
      price: 9.99 + i,
      description: 'Descripción del producto',
      photo_url: ''
    }));
  }

  onSearch(): void {
    // TODO: conectar con el servicio de búsqueda
    console.log('Buscar:', this.searchQuery);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  selectCategory(categoryId: number): void {
    this.selectedCategory = this.selectedCategory === categoryId ? null : categoryId;
    this.currentPage = 1;
    // TODO: filtrar productos por categoría
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
    // TODO: conectar con el servicio de favoritos
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // TODO: recargar productos
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      // TODO: recargar productos
    }
  }
}