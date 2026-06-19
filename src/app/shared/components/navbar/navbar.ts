import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  isLoggedIn: boolean = true;
  userAvatar: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // TODO: conectar con el servicio de autenticación
    // this.isLoggedIn = this.authService.isLoggedIn();
    // this.userAvatar = this.authService.getCurrentUser()?.photo_url;
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  goToCreateProduct(): void {
    this.router.navigate(['/product/create']);
  }
}