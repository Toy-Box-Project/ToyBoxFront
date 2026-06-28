import { Component } from '@angular/core';
import { Category } from '../../shared/interfaces/category.interface';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar';
import { Itemfilters } from '../../shared/interfaces/item.interface';

// DEMO - use interface ItemCard
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

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, SearchBarComponent, FilterSidebarComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent {
  searchTerm = '';
  activeFilters: Itemfilters = {};

  categories: Category[] = [
    {
      id_categories: 0,
      name: 'Todas',
      description: null
    },
    {
      id_categories: 1,
      name: 'Figuras, muñecos y vehículos',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg'
    },
    {
      id_categories: 2,
      name: 'Construcción y bloques',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_construccion.svg'
    },
    {
      id_categories: 3,
      name: 'Juegos de mesa y puzzles',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg'
    },
    {
      id_categories: 4,
      name: 'Juguetes educativos',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_educativo.svg'
    },
    {
      id_categories: 5,
      name: 'Bebés y primera infancia',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_bebes.svg'
    },
    {
      id_categories: 6,
      name: 'Aire libre y movimiento',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_airelibre.svg'
    },
    {
      id_categories: 7,
      name: 'Imaginación y juego simbólico',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_imaginacion.svg'
    },
    {
      id_categories: 8,
      name: 'Videojuegos y consolas',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_videojuegos.svg'
    }
  ];

  
  products: CatalogProduct[] = [
    {
      id: 1,
      title: 'Pack de coches y figuras',
      category: 'Figuras, muñecos y vehículos',
      price: 18,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
      badge: 'Publicado'
    },
    {
      id: 2,
      title: 'Caja de bloques de construcción',
      category: 'Construcción y bloques',
      price: 22,
      location: 'Valencia',
      status: 'Buen estado',
      image: '/assets/images/Iconos%20categorias/icono_construccion.svg',
      badge: 'Publicado'
    },
    {
      id: 3,
      title: 'Puzzle familiar de animales',
      category: 'Juegos de mesa y puzzles',
      price: 12,
      location: 'Murcia',
      status: 'Como nuevo',
      image: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg',
      badge: 'Reservado'
    },
    {
      id: 4,
      title: 'Juego educativo de ciencia',
      category: 'Juguetes educativos',
      price: 15,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/Iconos%20categorias/icono_educativo.svg',
      badge: 'Publicado'
    },
    {
      id: 5,
      title: 'Juguete sensorial para bebé',
      category: 'Bebés y primera infancia',
      price: 9,
      location: 'Alicante',
      status: 'Buen estado',
      image: '/assets/images/Iconos%20categorias/icono_bebes.svg',
      badge: 'Publicado'
    },
    {
      id: 6,
      title: 'Patinete infantil plegable',
      category: 'Aire libre y movimiento',
      price: 25,
      location: 'Sevilla',
      status: 'Usado',
      image: '/assets/images/Iconos%20categorias/icono_airelibre.svg',
      badge: 'Publicado'
    },
    {
      id: 7,
      title: 'Set de cocina de juguete',
      category: 'Imaginación y juego simbólico',
      price: 19,
      location: 'Granada',
      status: 'Buen estado',
      image: '/assets/images/Iconos%20categorias/icono_imaginacion.svg',
      badge: 'Publicado'
    },
    {
      id: 8,
      title: 'Mando para consola retro',
      category: 'Videojuegos y consolas',
      price: 14,
      location: 'Barcelona',
      status: 'Muy buen estado',
      image: '/assets/images/Iconos%20categorias/icono_videojuegos.svg',
      badge: 'Publicado'
    }
  ];

  onSearch(term: string): void {
    this.searchTerm = term;
  }
   onFiltersApplied(filters: Itemfilters): void {
    this.activeFilters = filters;
  }
}