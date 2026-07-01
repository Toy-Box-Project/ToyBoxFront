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
    id_categories: 1,
    name: 'Videojuegos y consolas',
    description: 'Juegos de PlayStation, Xbox, Nintendo y otras consolas',
    icon: '/assets/images/Iconos%20categorias/icono_videojuegos.svg'
  },
  {
    id_categories: 2,
    name: 'Construcciones y bloques',
    description: 'Juguetes tipo LEGO, bloques de construcción y sets creativos',
    icon: '/assets/images/Iconos%20categorias/icono_construccion.svg'
  },
  {
    id_categories: 3,
    name: 'Muñecos y figuras',
    description: 'Muñecas, figuras de acción y personajes coleccionables',
    icon: '/assets/images/Iconos%20categorias/icono_bebes.svg'
  },
  {
    id_categories: 4,
    name: 'Puzzles y rompecabezas',
    description: 'Puzzles de piezas, rompecabezas 2D y 3D',
    icon: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg'
  },
  {
    id_categories: 5,
    name: 'Juegos de mesa y cartas',
    description: 'Juegos de tablero, cartas y party games',
    icon: '/assets/images/Iconos%20categorias/icono_imaginacion.svg'
  },
  {
    id_categories: 6,
    name: 'Educativos y preescolar',
    description: 'Juguetes sensoriales, educativos y seguros para bebés y peques',
    icon: '/assets/images/Iconos%20categorias/icono_educativo.svg'
  },
  {
    id_categories: 7,
    name: 'Vehículos y circuitos',
    description: 'Coches, trenes, pistas y circuitos',
    icon: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg'
  },
  {
    id_categories: 8,
    name: 'Arte y manualidades',
    description: 'Kits creativos, pintura, plastilina y manualidades',
    icon: '/assets/images/Iconos%20categorias/icono_airelibre.svg'
  }
];

  productStates: string[] = [
    'Como nuevo',
    'Muy buen estado',
    'Buen estado',
    'Usado'
  ];
}
