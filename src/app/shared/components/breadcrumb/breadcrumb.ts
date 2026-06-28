import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

// INTERFACE LOCAL
export interface BreadcrumbItem {
  label: string;
  route?: string | string[];
  icon?: string; // optional
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
