import { Component } from '@angular/core';
import { Category } from '../../../shared/interfaces/category.interface';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProductComponent {
  categories: Category[] = [
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

  productStates: string[] = [
    'Como nuevo',
    'Muy buen estado',
    'Buen estado',
    'Usado'
  ];

  product: Product = {
    id: 1,
    title: 'Pack de coches y figuras',
    category: 'Figuras, muñecos y vehículos',
    price: 18,
    location: 'Madrid',
    province: 'Madrid',
    city: 'Madrid',
    status: 'Muy buen estado',
    image: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
    badge: 'Publicado',
    description:
      'Pack de juguetes infantiles compuesto por coches, pequeñas figuras y accesorios. Está en muy buen estado y listo para que otro niño pueda seguir jugando.'
  };
}