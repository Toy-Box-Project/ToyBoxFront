import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css'
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];
  @Input() badge = '';
  @Input() altText = 'Imagen del producto';

  selectedIndex = 0;

  get selectedImage(): string {
    return this.images[this.selectedIndex] || '/assets/images/Iconos%20categorias/icono_educativo.svg';
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }
}