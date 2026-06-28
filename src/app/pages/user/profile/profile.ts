import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating';
import { UserAvatarComponent } from '../../../shared/components/user-avatar/user-avatar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule, RouterModule, NavbarComponent, FooterComponent, StarRatingComponent,
    UserAvatarComponent ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  user: any = null;
  rating: number = 0;
  reviewsCount: number = 0;

  showImageModal = false;
  backendError = '';

  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    /*
    ============================================================
    REAL BACKEND — Node.js + Express + MySQL (db_toybox
    ============================================================

    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
        this.rating = res.user.rating;          
        this.reviewsCount = res.user.reviews;   
      },
      error: () => {
        this.backendError = 'Error al cargar el perfil';
      }
    });

    */

    // DEMO
    this.user = {
      firstName: 'Luna',
      lastName: 'García',
      username: 'lunita_dev',
      email: 'luna@example.com',
      phone: '612345678',
      birthdate: '1998-04-12',
      user_province: 'Madrid',
      user_city: 'Madrid',
      user_zipcode: '28001',
      profile_picture: '/assets/images/default-avatar.png'
    };

    // DEMO
    this.rating = 4.5;       
    this.reviewsCount = 82;  
  }

  openImageModal() { this.showImageModal = true; }
  closeImageModal() { this.showImageModal = false; }

  openMap() {
    /*
    TODO: Replace with real map navigation
    Example:
    this.router.navigate(['/map'], { queryParams: { city: this.user.user_city }});
    */
  }

  logout() {
    /*
    REAL BACKEND LOGOUT
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
    */

    this.router.navigate(['/auth/login']);
  }

  goToEditProfile() {
    this.router.navigate(['/user/edit-profile']);
  }
}
