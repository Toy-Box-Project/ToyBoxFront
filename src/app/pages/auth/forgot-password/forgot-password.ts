import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {
  backendError = '';
  backendSuccess = '';
  isLoading = false;

  constructor(private router: Router) {}

  form: FormGroup = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false },
      [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]
    )
  });

  checkControl(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  onSubmit(): void {
    this.backendError = '';
    this.backendSuccess = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.disableForm();

    setTimeout(() => {
      this.isLoading = false;
      this.enableForm();
      
      this.backendSuccess =
        'Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña en breve.';
      this.form.reset();
      
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 3000);
    }, 1000);

  }

  private disableForm(): void {
    this.form.disable({ emitEvent: false });
  }

  private enableForm(): void {
    this.form.enable({ emitEvent: false });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}