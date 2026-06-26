import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  showPassword = false;

  backendError = '';
  backendSuccess = '';


  private minLength8(control: FormControl): ValidationErrors | null {
    return control.value && control.value.length >= 8 ? null : { minLength8: true };
  }

  private hasUppercase(control: FormControl): ValidationErrors | null {
    return /[A-Z]/.test(control.value) ? null : { uppercase: true };
  }

  private hasSpecialChar(control: FormControl): ValidationErrors | null {
    return /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(control.value)
      ? null
      : { special: true };
  }

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ]),

    password: new FormControl('', [
      Validators.required,
      this.minLength8.bind(this),
      this.hasUppercase.bind(this),
      this.hasSpecialChar.bind(this)
    ]),

    phone: new FormControl('', [
      Validators.pattern(/^\d{9}$/)
    ]),

    birthdate: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),

    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}$/)
    ]),
  });

  constructor(
    private router: Router,
    // private authService: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  checkControl(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  onSubmit() {
    this.backendError = '';
    this.backendSuccess = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newUser = this.form.value;

    /*
    ============================================================
    REAL BACKEND — Node.js + Express + MySQL (db_toybox
    ============================================================

    this.authService.register(newUser).subscribe({
      next: () => {
        this.backendSuccess = 'Usuario creado correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        if (err.error?.message === 'EMAIL_ALREADY_EXISTS') {
          this.backendError = 'Este email ya está registrado.';
        }
        else if (err.error?.message === 'USERNAME_ALREADY_EXISTS') {
          this.backendError = 'Este nombre de usuario ya está en uso.';
        }
        else {
          this.backendError = 'Error al registrar usuario.';
        }
      }
    });
    */

    
    // demo
    if (newUser.email === 'existe@ejemplo.com') {
      this.backendError = 'Este email ya está registrado.';
      return;
    }

    if (newUser.username === 'usuarioexistente') {
      this.backendError = 'Este nombre de usuario ya está en uso.';
      return;
    }

    this.backendSuccess = 'Usuario creado correctamente. Ya puedes iniciar sesión.';
    setTimeout(() => this.router.navigate(['/auth/login']), 1500);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
