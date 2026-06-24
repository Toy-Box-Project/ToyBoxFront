import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() product: Product = {
    id: 0,
    title: 'Juguete Toybox',
    category: 'Categoría',
    price: 0,
    location: 'Sin ubicación',
    status: 'Buen estado',
    image: '/assets/images/Iconos%20categorias/icono_educativo.svg',
    badge: 'Publicado'
  };
}