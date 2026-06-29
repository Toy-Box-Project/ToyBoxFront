import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  route?: string | string[];
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() items: BreadcrumbItem[] = [];
  @Input() autoGenerate: boolean = true;

  private destroy$ = new Subject<void>();

  // Mapeo exhaustivo de rutas a etiquetas e iconos
  private routeLabels: { [key: string]: { label: string; icon?: string } } = {
    // Rutas públicas
    'catalog': { label: 'Catálogo', icon: 'package' },
    'product': { label: 'Detalles del Producto', icon: 'info' },

    // Auth
    'auth': { label: 'Autenticación', icon: 'security' },
    'login': { label: 'Iniciar Sesión', icon: 'login' },
    'register': { label: 'Registro', icon: 'person_add' },
    'forgot-password': { label: 'Recuperar Contraseña', icon: 'lock_reset' },

    // User
    'user': { label: 'Mi Cuenta', icon: 'person' },
    'profile': { label: 'Perfil', icon: 'person' },
    'edit-profile': { label: 'Editar Perfil', icon: 'edit' },
    'my-products': { label: 'Mis Productos', icon: 'store' },
    'my-purchases': { label: 'Mis Compras', icon: 'shopping_bag' },
    'favorites': { label: 'Favoritos', icon: 'favorite' },

    // Product Management
    'create': { label: 'Crear Producto', icon: 'add_circle' },
    'edit': { label: 'Editar Producto', icon: 'edit' },

    // Chat
    'chat': { label: 'Mensajes', icon: 'mail' },

    // Moderator
    'moderator': { label: 'Moderación', icon: 'shield' },
    'reports': { label: 'Reportes', icon: 'report' },
    'report': { label: 'Detalle del Reporte', icon: 'report_problem' },

    // Admin
    'admin': { label: 'Panel de Admin', icon: 'admin_panel_settings' },
    'dashboard': { label: 'Dashboard', icon: 'dashboard' },
    'users': { label: 'Gestión de Usuarios', icon: 'people' },
    'categories': { label: 'Gestión de Categorías', icon: 'category' }
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.autoGenerate) {
      this.generateBreadcrumbs();

      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.generateBreadcrumbs();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateBreadcrumbs(): void {
    const breadcrumbs: BreadcrumbItem[] = [];

    // Agregar "Inicio" siempre
    breadcrumbs.push({
      label: 'Inicio',
      route: ['/'],
      icon: 'home'
    });

    // Obtener el URL actual
    const urlSegments: string[] = [];
    let route = this.activatedRoute.root;

    while (route) {
      const children = route.children;

      if (children.length === 0) {
        break;
      }

      const child = children[0];
      const routeSegments = child.snapshot.url.map(segment => segment.path);

      if (routeSegments.length > 0) {
        routeSegments.forEach(segment => {
          // Ignorar parámetros dinámicos (como :id)
          if (!segment.startsWith(':')) {
            urlSegments.push(segment);
          }
        });
      }

      route = child;
    }

    // Construir breadcrumbs basado en los segmentos
    let currentPath = '';
    for (let i = 0; i < urlSegments.length; i++) {
      const segment = urlSegments[i];
      currentPath += `/${segment}`;

      const config = this.routeLabels[segment];
      if (config) {
        breadcrumbs.push({
          label: config.label,
          route: currentPath,
          icon: config.icon
        });
      }
    }

    // Si no hay items manually set, usar los generados
    if (this.items.length === 0) {
      this.items = breadcrumbs;
    }
  }
}
