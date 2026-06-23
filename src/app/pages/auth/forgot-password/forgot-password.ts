import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {
  //NECESARIO PARA SSR (no toca tu AuthService)
  isBrowser = typeof window !== 'undefined';

  backendError = '';
  backendSuccess = '';

  // ---------------------------------------------------------
  // Reactive form with validators
  // ---------------------------------------------------------
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ])
  });

  //Comentado para que no me de error
//   constructor(private authService: AuthService) {}

  // ---------------------------------------------------------
  // Shows validation errors only when touched + invalid
  // ---------------------------------------------------------
  checkControl(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  // ---------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------
  onSubmit() {
    this.backendError = '';
    this.backendSuccess = '';

    // Evita que SSR ejecute este código
    if (!this.isBrowser) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email } = this.form.value;

    /*
    =====================================================
    REAL BACKEND (Node.js + Express + MySQL db_toybox1)
    =====================================================

    this.authService.forgotPassword({ email }).subscribe({
      next: () => {
        this.backendSuccess =
          'Si el email existe, recibirás un enlace para restablecer tu contraseña.';
      },
      error: (err) => {
        if (err.error?.message === 'EMAIL_NOT_FOUND') {
          this.backendError = 'Este email no está registrado.';
        } else {
          this.backendError = 'Error al procesar la solicitud.';
        }
      }
    });

    */

    // =====================================================
    // TEMPORARY DEMO (remove when backend is ready)
    // =====================================================
    if (email === 'noexiste@ejemplo.com') {
      this.backendError = 'Este email no está registrado.';
      return;
    }

    this.backendSuccess =
      'Simulación: se enviaría un email con instrucciones de recuperación.';
  }
}
