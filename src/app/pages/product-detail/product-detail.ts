import { Component } from '@angular/core';
import { ProductCardData } from '../../shared/interfaces/item.interface';
import { ImageGalleryComponent } from '../../shared/components/image-gallery/image-gallery';

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

  product: ProductCardData = {
    id: 1,
    title: 'Pack de coches y figuras',
    category: 'Figuras, muñecos y vehículos',
    price: 18,
    location: 'Madrid',
    status: 'Muy buen estado',
    image: '/assets/images/Iconos%20categorias/icono_munecosycoches.svg',
    badge: 'Publicado',
    description:
      'Pack de juguetes infantiles compuesto por coches, pequeñas figuras y accesorios. Está en muy buen estado y listo para que otro niño pueda seguir jugando.',
    seller: {
      name: 'María López',
      rating: 4.8,
      reviews: 23,
      city: 'Madrid'
    }
  };

  relatedProducts: ProductCardData[] = [
    {
      id: 2,
      title: 'Caja de bloques',
      category: 'Construcción y bloques',
      price: 22,
      location: 'Valencia',
      status: 'Buen estado',
      image: '/assets/images/Iconos%20categorias/icono_construccion.svg',
      badge: 'Publicado'
    },
    {
      id: 3,
      title: 'Puzzle familiar',
      category: 'Juegos de mesa y puzzles',
      price: 12,
      location: 'Murcia',
      status: 'Como nuevo',
      image: '/assets/images/Iconos%20categorias/icono_juegosmesa.svg',
      badge: 'Publicado'
    },
    {
      id: 4,
      title: 'Juego educativo',
      category: 'Juguetes educativos',
      price: 15,
      location: 'Madrid',
      status: 'Muy buen estado',
      image: '/assets/images/Iconos%20categorias/icono_educativo.svg',
      badge: 'Publicado'
    }
  ];
}