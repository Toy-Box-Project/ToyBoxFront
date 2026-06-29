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
    { id_categories: 1, name: 'Figuras, muñecos y vehículos', description: null, icon: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg' },
    { id_categories: 2, name: 'Construcción y bloques', description: null, icon: '/assets/images/Iconos%20categorias/icono_construccion.svg' },
    { id_categories: 3, name: 'Juegos de mesa y puzzles', description: null, icon: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg' },
    { id_categories: 4, name: 'Juguetes educativos', description: null, icon: '/assets/images/Iconos%20categorias/icono_educativo.svg' },
    { id_categories: 5, name: 'Bebés y primera infancia', description: null, icon: '/assets/images/Iconos%20categorias/icono_bebes.svg' },
    { id_categories: 6, name: 'Aire libre y movimiento', description: null, icon: '/assets/images/Iconos%20categorias/icono_airelibre.svg' },
    { id_categories: 7, name: 'Imaginación y juego simbólico', description: null, icon: '/assets/images/Iconos%20categorias/icono_imaginacion.svg' },
    { id_categories: 8, name: 'Videojuegos y consolas', description: null, icon: '/assets/images/Iconos%20categorias/icono_videojuegos.svg' }
  ];

  productStates: string[] = [
    'Como nuevo',
    'Muy buen estado',
    'Buen estado',
    'Usado'
  ];
}
