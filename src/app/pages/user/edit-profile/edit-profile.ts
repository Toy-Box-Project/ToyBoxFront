import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { UserAvatarComponent } from '../../../shared/components/user-avatar/user-avatar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NavbarComponent, FooterComponent, UserAvatarComponent ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  previewImage: string | null = null;

  backendError = '';
  backendSuccess = '';
  showPassword = false;
  showDeleteModal = false;

  mapUrl: string = '/assets/images/map-placeholder.jpg';
  user: any = null;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    /*
    ============================================================
    REAL BACKEND — Cargar datos del usuario desde db_toybox
    ============================================================

    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.initializeForm(res);
      },
      error: () => this.backendError = 'Error al cargar el perfil'
    });

    */

    // MOCK TEMPORAL
    this.user = {
      username: 'lunita_dev',
      firstName: 'Luna',
      lastName: 'García',
      email: 'luna@example.com',
      phone: '612345678',
      user_city: 'Madrid',
      user_province: 'Madrid',
      user_zipcode: '28001',
      user_birthday: '1998-04-12',
      profile_picture: '/assets/images/default-avatar.png'
    };

    this.initializeForm(this.user);
  }

  initializeForm(u: any) {
    const date = u.user_birthday ? new Date(u.user_birthday) : null;

    this.form = this.fb.group({
      username: [{ value: u.username, disabled: true }],   
      firstName: [u.firstName, Validators.required],      
      lastName: [u.lastName, Validators.required],         
      email: [u.email, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: [''],
      phone: [u.phone, [Validators.pattern(/^\d{9}$/)]],
      day: [date ? String(date.getDate()).padStart(2, '0') : ''],
      month: [date ? String(date.getMonth() + 1).padStart(2, '0') : ''],
      year: [date ? String(date.getFullYear()) : ''],
      user_city: [u.user_city, Validators.required],
      user_province: [u.user_province, Validators.required],
      user_zipcode: [u.user_zipcode, [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });

    this.previewImage = u.profile_picture;

    this.form.get('user_zipcode')?.valueChanges.subscribe(zip => {
      if (/^\d{5}$/.test(zip)) this.updateMap(zip);
    });

    if (u.user_zipcode) this.updateMap(u.user_zipcode);
  }

  updateMap(zip: string) {
    /*
    ============================================================
    REAL BACK / API MAPAS
    ============================================================

    this.mapService.getMap(zip).subscribe(url => this.mapUrl = url);

    */
    this.mapUrl = `/assets/images/maps/${zip}.jpg`;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }

  confirmDeletePhoto() {
    this.previewImage = null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  openMap() {
    //pending
    this.router.navigate(['/user/map'], {
      queryParams: { zip: this.form.value.user_zipcode }
    });
  }

  checkControl(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  save() {
    this.backendError = '';
    this.backendSuccess = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.getRawValue();

    const birthday =
      f.day && f.month && f.year
        ? `${f.year}-${f.month}-${f.day}`
        : null;

    const updatedUser = {
      username: f.username,
      firstName: f.firstName,
      lastName: f.lastName,
      email: f.email,
      password: f.password || undefined,
      phone: f.phone,
      user_city: f.user_city,
      user_province: f.user_province,
      user_zipcode: f.user_zipcode,
      user_birthday: birthday,
      profile_picture: this.previewImage
    };

    /*
    ============================================================
    REAL BACKEND — Actualizar usuario en db_toybox1
    ============================================================

    this.authService.updateProfile(updatedUser).subscribe({
      next: () => {
        this.backendSuccess = 'Perfil actualizado correctamente';
        setTimeout(() => this.router.navigate(['/user/profile']), 1200);
      },
      error: (err) => {
        this.backendError = err.error?.message || 'Error al actualizar el perfil';
      }
    });

    */

    this.backendSuccess = 'Simulación: perfil actualizado correctamente';
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteAccount() {
    /*
    ============================================================
    REAL BACKEND — Dar de baja cuenta
    ============================================================

    this.authService.deleteAccount().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.backendError = 'Error al eliminar la cuenta'
    });

    */

    alert('Simulación: cuenta eliminada');
    this.router.navigate(['/auth/login']);
  }
}
