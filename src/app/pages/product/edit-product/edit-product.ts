import { Component } from '@angular/core';
import { Category } from '../../../shared/interfaces/category.interface';

// DEMO - use interface ItemFormData
interface EditProductData {
  id?: number;
  title: string;
  description?: string | null;
  price: number;
  location: string;
  province: string;
  city: string;
  status: string;
  category: string;
  image: string;
  badge: string;
  fk_categories_id: number;
}
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

  product: EditProductData = {
    id: 1,
    title: 'Pack de coches y figuras',
    description: 'Pack de juguetes infantiles compuesto por coches, pequeñas figuras y accesorios. Está en muy buen estado y listo para que otro niño pueda seguir jugando.',
    price: 18,
    location: 'Madrid',
    province: 'Madrid',
    city: 'Madrid',
    status: 'Muy buen estado',
    category: 'Videojuegos y consolas',
    image: '/assets/images/Iconos%20categorias/icono_videojuegos.svg',
    badge: 'Publicado',
    fk_categories_id: 1
  };
}
