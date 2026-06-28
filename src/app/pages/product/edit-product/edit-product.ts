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

  product: EditProductData = {
    id: 1,
    title: 'Pack de coches y figuras',
    description: 'Pack de juguetes infantiles compuesto por coches, pequeñas figuras y accesorios. Está en muy buen estado y listo para que otro niño pueda seguir jugando.',
    price: 18,
    location: 'Madrid',
    province: 'Madrid',
    city: 'Madrid',
    status: 'Muy buen estado',
    category: 'Figuras, muñecos y vehículos',
    image: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
    badge: 'Publicado',
    fk_categories_id: 1
  };
}
