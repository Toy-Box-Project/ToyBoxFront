import { Component } from '@angular/core';
import { Category } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProductComponent {
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
}