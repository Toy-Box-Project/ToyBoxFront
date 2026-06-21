import { Component } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { Category } from '../../shared/interfaces/category.interface';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent {
  categories: Category[] = [
    {
      id: 0,
      name: 'Todas',
      icon: ''
    },
    {
      id: 1,
      name: 'Figuras, muñecos y vehículos',
      icon: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg'
    },
    {
      id: 2,
      name: 'Construcción y bloques',
      icon: '/assets/images/Iconos%20categorias/icono_construccion.svg'
    },
    {
      id: 3,
      name: 'Juegos de mesa y puzzles',
      icon: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg'
    },
    {
      id: 4,
      name: 'Juguetes educativos',
      icon: '/assets/images/Iconos%20categorias/icono_educativo.svg'
    },
    {
      id: 5,
      name: 'Bebés y primera infancia',
      icon: '/assets/images/Iconos%20categorias/icono_bebes.svg'
    },
    {
      id: 6,
      name: 'Aire libre y movimiento',
      icon: '/assets/images/Iconos%20categorias/icono_airelibre.svg'
    },
    {
      id: 7,
      name: 'Imaginación y juego simbólico',
      icon: '/assets/images/Iconos%20categorias/icono_imaginacion.svg'
    },
    {
      id: 8,
      name: 'Videojuegos y consolas',
      icon: '/assets/images/Iconos%20categorias/icono_videojuegos.svg'
    }
  ];

  products: Product[] = [
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
}