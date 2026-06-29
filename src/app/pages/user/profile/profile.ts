import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { ReviewsService } from '../../../core/services/reviews.service';
import { LocationsService } from '../../../core/services/locations.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating';
import { MapStaticComponent } from '../../../shared/components/map-static/map-static';
import { User } from '../../../shared/interfaces/user.interface';
import { Review } from '../../../shared/interfaces/review.interface';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { UserAvatarComponent } from '../../../shared/components/user-avatar/user-avatar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, StarRatingComponent, MapStaticComponent, UserAvatarComponent],
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

  userLatitude: number | null = null;
  userLongitude: number | null = null;

  private destroy$ = new Subject<void>();

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/', icon: 'home' },
    { label: 'Perfil', route: '/user/profile', icon: 'person' }
  ];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private reviewsService: ReviewsService,
    private locationsService: LocationsService,
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
          this.loadPublicProfile(parseInt(userId));
        } else if (this.authService.isLoggedIn()) {
          this.loadPrivateProfile();
        } else {
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
        next: async (user: User) => {
          console.log('✅ User loaded:', user);
          this.user = user;
          this.loadReviews(userId);
          this.updateBreadcrumb();
          await this.loadCoordinates();
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

    this.usersService.getById(currentUser.id_users)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (user: User) => {
          console.log('✅ Current user loaded:', user);
          this.user = user;
          this.isAdmin = user.role === UserRole.Administrator;
          this.loadReviews(user.id_users);
          this.updateBreadcrumb();
          await this.loadCoordinates();
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al cargar tu perfil.';
          console.error('Error loading private profile:', error);
        }
      });
  }

  loadReviews(userId: number): void {
    this.reviewsService.getBySeller(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reviews: Review[]) => {
          this.reviews = reviews;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading reviews:', error);
          this.isLoading = false;
        }
      });
  }

  async loadCoordinates(): Promise<void> {
    if (!this.user || !this.user.user_city || !this.user.user_province) {
      console.warn('⚠️ No hay ciudad o provincia para cargar coordenadas');
      return;
    }

    try {
      const coordinates = await this.locationsService.getCoordinates(
        this.user.user_province,
        this.user.user_city
      );

      if (coordinates) {
        this.userLatitude = coordinates.lat;
        this.userLongitude = coordinates.lng;
        console.log('✅ Coordenadas cargadas:', { lat: this.userLatitude, lng: this.userLongitude });
      } else {
        console.warn('⚠️ No se pudieron obtener coordenadas para', this.user.user_city, this.user.user_province);
      }
    } catch (error) {
      console.error('❌ Error cargando coordenadas:', error);
    }
  }

  updateBreadcrumb(): void {
    if (this.user) {
      this.breadcrumbItems = [
        { label: 'Inicio', route: '/', icon: 'home' },
        { label: `${this.user.first_name} ${this.user.last_name}`, route: '/user/profile', icon: 'person' }
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
    this.router.navigate(['/admin/categories']);
  }

  goToUsersManagement(): void {
    this.router.navigate(['/admin/users']);
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      this.authService.logout();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      this.router.navigate(['/auth/login']);
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
            this.router.navigate(['/auth/login']);
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
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}