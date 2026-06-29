import { Component, EventEmitter, Input, Output } from '@angular/core';

// DEMO - use interface ItemCard
interface DemoProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  status: string;
  image: string;
  badge: string;
}
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Output() toggleFavorite = new EventEmitter<number>();

  //demo
  @Input() product: DemoProduct = {
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