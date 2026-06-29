import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { ReviewsService } from '../../../core/services/reviews.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating';
import { MapStaticComponent } from '../../../shared/components/map-static/map-static';
import { User } from '../../../shared/interfaces/user.interface';
import { Review } from '../../../shared/interfaces/review.interface';
import { UserRole } from '../../../shared/enums/user-role.enum';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    StarRatingComponent,
    MapStaticComponent
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  reviews: Review[] = [];
  isCurrentUser = false;
  isAdmin = false;
  isLoading = true;
  errorMessage: string | null = null;
  showDeleteModal = false;
  showAvatarModal = false;
  showMapModal = false;
  currentUserId: number | null = null;
  private destroy$ = new Subject<void>();

  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Perfil', url: '/user/profile' }
  ];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    this.currentUserId = currentUser?.id_users ?? null;
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const userId = params['id'];

        if (userId) {
          // Si hay param: cargar ese usuario (público)
          this.loadPublicProfile(parseInt(userId));
        } else if (this.authService.isLoggedIn()) {
          // Si no hay param y está autenticado: cargar su propio perfil (privado)
          this.loadPrivateProfile();
        } else {
          // Si no hay param y NO está autenticado: cargar usuario 1 (público)
          this.loadPublicProfile(1);
        }
      });
  }

  loadPublicProfile(userId: number): void {
    this.isLoading = true;
    this.isCurrentUser = false;
    this.errorMessage = null;

    this.usersService.getById(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          console.log('✅ User loaded:', user); // DEBUG
          this.user = user;
          this.loadReviews(userId);
          this.updateBreadcrumb();
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al cargar el perfil del usuario.';
          console.error('Error loading public profile:', error);
        }
      });
  }

  loadPrivateProfile(): void {
    this.isLoading = true;
    this.isCurrentUser = true;
    this.errorMessage = null;

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.isLoading = false;
      this.errorMessage = 'No hay usuario autenticado.';
      return;
    }

    // Recargar datos del usuario desde el servidor
    this.usersService.getById(currentUser.id_users)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          console.log('✅ Current user loaded:', user); // DEBUG
          this.user = user;
          this.isAdmin = user.role === UserRole.Administrator;
          this.loadReviews(user.id_users);
          this.updateBreadcrumb();
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al cargar tu perfil.';
          console.error('Error loading private profile:', error);
        }
      });
  }

  loadReviews(userId: number): void {
    // Cargar reviews recibidas (como vendedor)
    this.reviewsService.getBySeller(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reviews: Review[]) => {
          this.reviews = reviews;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading reviews:', error);
          // No fallar la carga del perfil si las reviews fallan
          this.isLoading = false;
        }
      });
  }

  updateBreadcrumb(): void {
    if (this.user) {
      this.breadcrumbItems = [
        { label: 'Inicio', url: '/' },
        { label: `${this.user.first_name} ${this.user.last_name}`, url: '/user/profile' }
      ];
    }
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  }

  getInitials(): string {
    if (!this.user) return '';
    return `${this.user.first_name.charAt(0)}${this.user.last_name.charAt(0)}`.toUpperCase();
  }

  getFullName(): string {
    if (!this.user) return '';
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  getLocation(): string {
    if (!this.user) return '';
    const parts = [this.user.user_city, this.user.user_province].filter(Boolean);
    return parts.join(', ');
  }

  toggleAvatarModal(): void {
    this.showAvatarModal = !this.showAvatarModal;
  }

  toggleMapModal(): void {
    this.showMapModal = !this.showMapModal;
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  goToEditProfile(): void {
    this.router.navigate(['/user/edit-profile']);
  }

  goToCategoriesManagement(): void {
    this.router.navigate(['/categories-management']);
  }

  goToUsersManagement(): void {
    this.router.navigate(['/users-management']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      this.authService.logout();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      this.router.navigate(['/login']);
    }
  }

  deleteAccount(): void {
    if (!this.user) return;

    if (confirm('¿Estás seguro? Esta acción NO se puede deshacer. Se borrarán todos tus datos.')) {
      this.usersService.deleteAccount(this.user.id_users)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            alert('Tu cuenta ha sido eliminada correctamente.');
            this.authService.logout();
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            alert(error.error?.message || 'Error al eliminar la cuenta.');
            console.error('Error deleting account:', error);
          }
        });
    }
    this.closeDeleteModal();
  }

  silenceUser(): void {
    if (!this.user) return;

    if (confirm(`¿Silenciar a ${this.user.first_name}? Este usuario no podrá enviar mensajes ni crear anuncios.`)) {
      alert('❌ Esta funcionalidad aún no está implementada en el backend.');
      console.log('Intentando silenciar al usuario:', this.user.id_users);
      // TODO: Implementar endpoint en backend para silenciar usuarios
      // this.usersService.silenceUser(this.user.id_users)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
