import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, ProductCardComponent,
    PaginationComponent ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent implements OnInit {

  favorites: any[] = [];
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  showConfirmModal = false;
  selectedFavoriteId: number | null = null;

  ngOnInit() {
    /*
    ============================================================
    BACKEND REAL (Node + Express + MySQL - db_toybox
    ============================================================

    this.favoritesService.getFavoritesByUser(userId).subscribe({
      next: (res) => {
        this.favorites = res;
        this.updatePagination();
      }
    });
    */

    // DEMO
    this.favorites = [
      { id: 1, title: 'Oso de Peluche', price: 24.99, imageUrl: '/assets/images/toys/teddy.jpg', isFavorite: true },
      { id: 2, title: 'Bloques de Construcción', price: 35.00, imageUrl: '/assets/images/toys/blocks.jpg', isFavorite: true },
      { id: 3, title: 'Tren Eléctrico', price: 59.99, imageUrl: '/assets/images/toys/train.jpg', isFavorite: true },
      { id: 4, title: 'Kit de Arte', price: 18.50, imageUrl: '/assets/images/toys/art.jpg', isFavorite: true },
      { id: 5, title: 'Cofre Especial', price: 32.00, imageUrl: '/assets/images/toys/chest.jpg', isFavorite: true },
      { id: 6, title: 'Robot', price: 69.99, imageUrl: '/assets/images/toys/robot.jpg', isFavorite: true },
      { id: 7, title: 'Casa de Muñecas', price: 110.00, imageUrl: '/assets/images/toys/dollhouse.jpg', isFavorite: true },
      { id: 8, title: 'Coche', price: 45.00, imageUrl: '/assets/images/toys/car.jpg', isFavorite: true },
      { id: 9, title: 'Puzzle 3D', price: 22.00, imageUrl: '/assets/images/toys/puzzle.jpg', isFavorite: true },
      { id: 10, title: 'Pelota Sensorial', price: 12.50, imageUrl: '/assets/images/toys/ball.jpg', isFavorite: true },
      { id: 11, title: 'Set de Cocina', price: 40.00, imageUrl: '/assets/images/toys/kitchen.jpg', isFavorite: true },
      { id: 12, title: 'Avión RC', price: 75.00, imageUrl: '/assets/images/toys/plane.jpg', isFavorite: true },
      { id: 13, title: 'Pistola de Burbujas', price: 15.00, imageUrl: '/assets/images/toys/bubbles.jpg', isFavorite: true },
      { id: 14, title: 'Peluche Unicornio', price: 28.00, imageUrl: '/assets/images/toys/unicorn.jpg', isFavorite: true },
      { id: 15, title: 'Juego de Mesa', price: 30.00, imageUrl: '/assets/images/toys/boardgame.jpg', isFavorite: true },
      { id: 16, title: 'Camión de Bomberos', price: 55.00, imageUrl: '/assets/images/toys/firetruck.jpg', isFavorite: true },
    ];

    this.updatePagination();
  }

  get totalFavorites() {
    return this.favorites.length;
  }

  get paginatedFavorites() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.favorites.slice(start, start + this.pageSize);
  }

  updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.favorites.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  requestRemoveFavorite(id: number) {
    this.selectedFavoriteId = id;
    this.showConfirmModal = true;
  }

  cancelRemove() {
    this.showConfirmModal = false;
    this.selectedFavoriteId = null;
  }

  confirmRemove() {
    if (!this.selectedFavoriteId) return;

    /*
    ============================================================
    BACKEND REAL
    ============================================================

    this.favoritesService.removeFavorite(this.selectedFavoriteId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.id !== this.selectedFavoriteId);
        this.updatePagination();
      }
    });
    */

    this.favorites = this.favorites.filter(f => f.id !== this.selectedFavoriteId);
    this.updatePagination();

    this.showConfirmModal = false;
    this.selectedFavoriteId = null;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
