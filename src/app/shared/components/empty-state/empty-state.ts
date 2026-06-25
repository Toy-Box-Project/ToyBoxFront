import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css'
})
export class EmptyStateComponent {

  @Input() icon = '🧸';

  @Input() title = 'Nada por aquí';

  @Input() message =
    'Todavía no hay contenido disponible.';

  @Input() buttonText = '';

  @Input() buttonLink = '/';

}