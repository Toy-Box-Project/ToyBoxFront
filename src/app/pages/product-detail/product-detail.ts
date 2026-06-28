import { Component } from '@angular/core';
import { ImageGalleryComponent } from '../../shared/components/image-gallery/image-gallery';
import { Category } from '../../shared/interfaces/category.interface';

// DEMO - use interface ItemDetail
interface DetailProduct {
  id: number;
  id_items: number;
  title: string;
  description: string | null;
  price: number;
  location: string;
  status: string;
  badge: string;
  image: string;
  category: Category;
  seller: {
    id_users?: number;
    name: string;
    username?: string;
    profile_picture?: string | null;
    rating: number;
    reviews: number;
    city: string;
  };
  totalViews?: number;
  averageRating?: number;
  reviews?: any[];
}
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ImageGalleryComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent {

    galleryImages: string[] = [
    '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
    '/assets/images/Iconos%20categorias/icono_construccion.svg',
    '/assets/images/Iconos%20categorias/icono_juegosmesa.svg'
  ];

product: DetailProduct = {
    id: 1,
    id_items: 1,
    title: 'Pack de coches y figuras',
    description: 'Pack de juguetes infantiles compuesto por coches, pequeñas figuras y accesorios. Está en muy buen estado y listo para que otro niño pueda seguir jugando.',
    price: 18,
    location: 'Madrid',
    status: 'Muy buen estado',
    badge: 'Publicado',
    image: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
    category: {
      id_categories: 1,
      name: 'Figuras, muñecos y vehículos',
      description: null,
      icon: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg'
    },
    seller: {
      name: 'María López',
      username: 'maria_lopez',
      id_users: 1,
      profile_picture: null,
      rating: 4.8,
      reviews: 23,
      city: 'Madrid'
    },
    totalViews: 125,
    averageRating: 4.8,
    reviews: []
  };

  relatedProducts: DetailProduct[] = [
    {
      id: 2,
      id_items: 2,
      title: 'Caja de bloques',
      description: null,
      price: 22,
      location: 'Valencia',
      status: 'Buen estado',
      badge: 'Publicado',
      image: '/assets/images/Iconos%20categorias/icono_construccion.svg',
      category: {
        id_categories: 2,
        name: 'Construcción y bloques',
        description: null,
        icon: '/assets/images/Iconos%20categorias/icono_construccion.svg'
      },
      seller: {
        name: 'Carlos López',
        username: 'carlos_lopez',
        id_users: 2,
        rating: 4.5,
        reviews: 15,
        city: 'Valencia'
      }
    },
    {
      id: 3,
      id_items: 3,
      title: 'Puzzle familiar',
      description: null,
      price: 12,
      location: 'Murcia',
      status: 'Como nuevo',
      badge: 'Publicado',
      image: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg',
      category: {
        id_categories: 3,
        name: 'Juegos de mesa y puzzles',
        description: null,
        icon: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg'
      },
      seller: {
        name: 'Ana Martínez',
        username: 'ana_martinez',
        id_users: 3,
        rating: 5.0,
        reviews: 8,
        city: 'Murcia'
      }
    }
  ];
}