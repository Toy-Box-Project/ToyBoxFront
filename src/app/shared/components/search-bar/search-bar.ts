import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent {
  @Input() label = '¿Qué estás buscando?';
  @Input() placeholder = 'Buscar...';
  @Input() buttonText = 'Buscar';

  @Output() search = new EventEmitter<string>();

  onSearch(value: string): void {
    this.search.emit(value.trim());
  }
}