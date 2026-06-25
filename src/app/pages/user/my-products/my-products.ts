import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

import { MyProduct } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    PaginationComponent
  ],
  templateUrl: './my-products.html',
  styleUrl: './my-products.css',
})
export class MyProductsComponent implements OnInit {

  products: MyProduct[] = [];
  productToDelete: MyProduct | null = null;
  showDeleteModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    /*
    ============================================================
    BACKEND REAL (Node + Express + MySQL - db_toybox1)
    ============================================================

    this.productService.getMyProducts(userId).subscribe({
      next: (res) => this.products = res,
      error: () => console.error('Error cargando productos')
    });
    */

    // DEMO DATA — luego lo reemplazas con datos reales de la BBDD
    this.products = [
      { id_products: 1, id_user: 10, product_title: 'Coche teledirigido', product_description: '', product_price: 25, product_category: 'juguetes', product_condition: 'nuevo', product_status: 'en_venta', product_created_at: '2026-05-12', product_updated_at: '2026-05-14', product_main_image: '/assets/images/demo1.jpg' },
      { id_products: 2, id_user: 10, product_title: 'Muñeca articulada', product_description: '', product_price: 12, product_category: 'juguetes', product_condition: 'usado', product_status: 'en_venta', product_created_at: '2026-06-01', product_updated_at: '2026-06-02', product_main_image: '/assets/images/demo2.jpg' },
      { id_products: 3, id_user: 10, product_title: 'Puzzle 500 piezas', product_description: '', product_price: 8, product_category: 'juguetes', product_condition: 'usado', product_status: 'en_venta', product_created_at: '2026-04-20', product_updated_at: '2026-04-21', product_main_image: '/assets/images/demo3.jpg' },
      { id_products: 4, id_user: 10, product_title: 'Pelota saltarina', product_description: '', product_price: 5, product_category: 'juguetes', product_condition: 'nuevo', product_status: 'en_venta', product_created_at: '2026-03-10', product_updated_at: '2026-03-11', product_main_image: '/assets/images/demo4.jpg' },
      { id_products: 5, id_user: 10, product_title: 'Set de pinturas', product_description: '', product_price: 15, product_category: 'manualidades', product_condition: 'nuevo', product_status: 'en_venta', product_created_at: '2026-02-15', product_updated_at: '2026-02-16', product_main_image: '/assets/images/demo5.jpg' },
      { id_products: 6, id_user: 10, product_title: 'Robot educativo', product_description: '', product_price: 40, product_category: 'tecnología', product_condition: 'nuevo', product_status: 'en_venta', product_created_at: '2026-01-10', product_updated_at: '2026-01-12', product_main_image: '/assets/images/demo6.jpg' },
      { id_products: 7, id_user: 10, product_title: 'Libro infantil', product_description: '', product_price: 6, product_category: 'libros', product_condition: 'usado', product_status: 'en_venta', product_created_at: '2025-12-01', product_updated_at: '2025-12-02', product_main_image: '/assets/images/demo7.jpg' },
      { id_products: 8, id_user: 10, product_title: 'Camión de bomberos', product_description: '', product_price: 18, product_category: 'juguetes', product_condition: 'nuevo', product_status: 'en_venta', product_created_at: '2025-11-10', product_updated_at: '2025-11-11', product_main_image: '/assets/images/demo8.jpg' },
      { id_products: 9, id_user: 10, product_title: 'Juego de mesa', product_description: '', product_price: 22, product_category: 'juegos', product_condition: 'usado', product_status: 'en_venta', product_created_at: '2025-10-05', product_updated_at: '2025-10-06', product_main_image: '/assets/images/demo9.jpg' },
      { id_products: 10, id_user: 10, product_title: 'Peluche gigante', product_description: '', product_price: 30, product_category: 'juguetes', product_condition: 'nuevo', product_status: 'en_venta', product_created_at: '2025-09-01', product_updated_at: '2025-09-02', product_main_image: '/assets/images/demo10.jpg' }
    ];
  }

  viewProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  markAsPurchased(id: number) {
    this.router.navigate(['/chat-list'], {
      queryParams: { productId: id }
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/pages/product/edit-product', id]);
  }

  confirmDelete(product: MyProduct) {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  deleteProductConfirmed() {
    if (!this.productToDelete) return;

    /*
    ============================================================
    BACKEND REAL
    ============================================================

    this.productService.deleteProduct(this.productToDelete.id_products).subscribe({
      next: () => {
        this.products = this.products.filter(
          p => p.id_products !== this.productToDelete!.id_products
        );
      }
    });
    */

    this.products = this.products.filter(
      p => p.id_products !== this.productToDelete!.id_products
    );

    this.showDeleteModal = false;
    this.productToDelete = null;
  }
}
