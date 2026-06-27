import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

// ✅ NUEVO: componente creado desde cero (carpeta existía vacía)
// Recibe un array de items y renderiza breadcrumbs con routerLink.
// El último item (actual) se muestra sin enlace y con aria-current.

export interface BreadcrumbItem {
  label: string;
  route?: string | string[];
}
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class BreadcrumbComponent {
    @Input() items: BreadcrumbItem[] = [];
}
