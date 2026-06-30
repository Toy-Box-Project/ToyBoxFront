import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  showPassword = false;
  isLoading = false;
  loginError = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false },
      [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]
    ),
    password: new FormControl(
      { value: '', disabled: false },
      [
        Validators.required,
        Validators.minLength(6)
      ]
    )
  });

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  checkControl(control: string, error: string): boolean {
    const c = this.loginForm.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  onSubmit(): void {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    
    this.disableForm();

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials as any).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.enableForm();

        switch (res.user.role) {
          case 'administrator':
            this.router.navigate(['/admin/dashboard']);
            break;
          case 'moderator':
            this.router.navigate(['/moderator/reports']);
            break;
          default:
            this.router.navigate(['/catalog']); 
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.enableForm();
        const backendError = err.error?.error || '';

        if (err.status === 401) {
          this.loginError = 'Email o contraseña incorrectos';
        } else if (err.status === 403) {
          this.loginError = 'Tu cuenta ha sido bloqueada';
        } else if (err.status === 400) {
          this.loginError = backendError || 'Campos requeridos faltantes';
        } else if (err.status === 0) {
          this.loginError = 'No hay conexión con el servidor';
        } else {
          this.loginError = backendError || 'Error al iniciar sesión';
        }
      }
    });
  }

  private disableForm(): void {
    this.loginForm.disable({ emitEvent: false });
  }

  private enableForm(): void {
    this.loginForm.enable({ emitEvent: false });
  }

  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}