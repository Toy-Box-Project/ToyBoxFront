import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterModule
} from '@angular/router';



import { AuthService } from '../../../core/services/auth.service';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  showPassword = false;

  loginError = '';

  loginForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])

  });

  constructor(
    private router: Router,
    // private authService: AuthService
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  checkControl(control: string, error: string): boolean {

    const c = this.loginForm.get(control);

    return !!(
      c &&
      c.touched &&
      c.hasError(error)
    );
  }

  onSubmit(): void {

    this.loginError = '';

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.getRawValue();

    /*
    =======================================
    REAL BACKEND (Node + Express + MySQL)
    =======================================

    this.authService.login(credentials).subscribe({
      next: (res) => {

        switch (res.user.role) {

          case 'administrador':
            this.router.navigate(['/admin']);
            break;

          case 'moderador':
            this.router.navigate(['/moderator']);
            break;

          default:
            this.router.navigate(['/user/profile']);
        }
      },

      error: (err) => {

        if (err.error?.message === 'INVALID_CREDENTIALS') {

          this.loginError =
            'Email o contraseña incorrectos';

        } else {

          this.loginError =
            'Se ha producido un error al iniciar sesión';
        }
      }
    });

    */

    /* Temporary demo */

    if (
      credentials.email === 'toybox@ejemplo.com' &&
      credentials.password === '123456'
    ) {

      this.router.navigate(['/user/profile']);

    } else {

      this.loginError =
        'Email o contraseña incorrectos.';
    }
  }

  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

}