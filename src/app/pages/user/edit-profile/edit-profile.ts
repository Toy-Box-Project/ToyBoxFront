import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { LocationsService } from '../../../core/services/locations.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';
import { MapStaticComponent } from '../../../shared/components/map-static/map-static';
import { User } from '../../../shared/interfaces/user.interface';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,BreadcrumbComponent,MapStaticComponent],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editProfileForm!: FormGroup;
  isLoading = false;
  isSaving = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showDeleteModal = false;
  showPasswordField = false;
  profilePicturePreview: string | null = null;
  selectedFile: File | null = null;

  provinces: string[] = [];
  cities: string[] = [];

  previewLatitude: number | null = null;
  previewLongitude: number | null = null;

  breadcrumbItems = [
    { label: 'Inicio', route: '/', icon: 'home' },
    { label: 'Mi Perfil', route: '/user/profile', icon: 'person' },
    { label: 'Editar Perfil', icon: 'edit' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private locationsService: LocationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.initializeForm();
    this.loadLocationData();
    this.loadUserData();
  }

  checkAuthentication(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  async loadLocationData(): Promise<void> {
    try {
      this.provinces = await this.locationsService.getProvincias();
    } catch (error) {
      console.error('Error loading provinces:', error);
      this.errorMessage = 'Error al cargar las provincias.';
    }
  }

  initializeForm(): void {
    this.editProfileForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.pattern(/^\d{9,15}$/)]],
      user_birthday: ['', [Validators.required, this.minAgeValidator(18)]],
      user_province: ['', [Validators.required]],
      user_city: ['', [Validators.required]],
      user_zipcode: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      password: ['', []],
      profile_picture: ['', []]
    });

    // Escuchar cambios en provincia para actualizar ciudades y coordenadas
    this.editProfileForm.get('user_province')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (province) => {
        await this.onProvinceChange(province);
      });

    // Escuchar cambios en ciudad para actualizar coordenadas
    this.editProfileForm.get('user_city')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (city) => {
        await this.onCityChange(city);
      });
  }

  loadUserData(): void {
    this.isLoading = true;
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      this.isLoading = false;
      this.errorMessage = 'No hay usuario autenticado.';
      return;
    }

    this.usersService.getById(currentUser.id_users)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.editProfileForm.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            user_birthday: user.user_birthday,
            user_province: user.user_province,
            user_city: user.user_city,
            user_zipcode: user.user_zipcode
          });

          if (user.user_province) {
            this.onProvinceChange(user.user_province).catch(error =>
              console.error('Error loading cities for province:', error)
            );
          }

          // Cargar las coordenadas iniciales del usuario (en background)
          if (user.user_province && user.user_city) {
            this.onCityChange(user.user_city).catch(error =>
              console.error('Error loading initial coordinates:', error)
            );
          }

          if (user.profile_picture) {
            this.profilePicturePreview = user.profile_picture;
          }

          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al cargar tus datos.';
          console.error('Error loading user data:', error);
        }
      });
  }

  async onProvinceChange(province: string): Promise<void> {
    if (province) {
      try {
        this.cities = await this.locationsService.getCiudadesByProvincia(province);
        this.editProfileForm.get('user_city')?.reset();
        this.previewLatitude = null;
        this.previewLongitude = null;
      } catch (error) {
        console.error('Error loading cities:', error);
        this.cities = [];
      }
    } else {
      this.cities = [];
      this.previewLatitude = null;
      this.previewLongitude = null;
    }
  }

  /**
   * Se ejecuta cuando cambia la ciudad seleccionada
   * Obtiene las coordenadas geográficas para mostrar en el mapa en tiempo real
   */
  async onCityChange(city: string): Promise<void> {
    const province = this.editProfileForm.get('user_province')?.value;

    if (city && province) {
      try {
        const coordinates = await this.locationsService.getCoordinates(province, city);
        if (coordinates) {
          this.previewLatitude = coordinates.lat;
          this.previewLongitude = coordinates.lng;
          console.log('✅ Coordenadas actualizadas para mapa preview:', { lat: this.previewLatitude, lng: this.previewLongitude });
        } else {
          console.warn('⚠️ No se encontraron coordenadas para', city, province);
          this.previewLatitude = null;
          this.previewLongitude = null;
        }
      } catch (error) {
        console.error('❌ Error cargando coordenadas del mapa:', error);
        this.previewLatitude = null;
        this.previewLongitude = null;
      }
    } else {
      this.previewLatitude = null;
      this.previewLongitude = null;
    }
  }

  minAgeValidator(minAge: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Por favor selecciona una imagen válida.';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'La imagen debe ser menor a 5MB.';
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profilePicturePreview = (e.target as FileReader).result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordField(): void {
    this.showPasswordField = !this.showPasswordField;
    const passwordControl = this.editProfileForm.get('password');
    if (this.showPasswordField) {
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      passwordControl?.clearValidators();
      passwordControl?.reset();
    }
    passwordControl?.updateValueAndValidity();
  }

  onSaveProfile(): void {
    if (this.editProfileForm.invalid) {
      this.markFormGroupTouched(this.editProfileForm);
      return;
    }

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.errorMessage = 'No hay usuario autenticado.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;
    this.successMessage = null;

    const formValue = this.editProfileForm.value;
    const updateData: Partial<User> = {
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      email: formValue.email,
      phone_number: formValue.phone_number,
      user_birthday: formValue.user_birthday,
      user_province: formValue.user_province,
      user_city: formValue.user_city,
      user_zipcode: formValue.user_zipcode
    };

    if (formValue.password) {
      updateData.password = formValue.password;
    }

    this.usersService.updateProfile(currentUser.id_users, updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser: User) => {
          this.isSaving = false;
          this.successMessage = 'Perfil actualizado correctamente.';
          this.authService.updateCurrentUser(updatedUser);

          if (this.selectedFile) {
            const formData = new FormData();
            formData.append('profile_picture', this.selectedFile);
            this.usersService.updateProfileImage(currentUser.id_users, formData)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (userWithImage: User) => {
                  this.authService.updateCurrentUser(userWithImage);
                  setTimeout(() => {
                    this.router.navigate(['/user/profile']);
                  }, 1500);
                },
                error: (error: HttpErrorResponse) => {
                  console.error('Error uploading profile image:', error);
                  setTimeout(() => {
                    this.router.navigate(['/user/profile']);
                  }, 1500);
                }
              });
          } else {
            setTimeout(() => {
              this.router.navigate(['/user/profile']);
            }, 1500);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isSaving = false;
          this.errorMessage = error.error?.message || 'Error al actualizar el perfil.';
          console.error('Error updating profile:', error);
        }
      });
  }

  onCancel(): void {
    if (confirm('¿Descartar cambios?')) {
      this.router.navigate(['/user/profile']);
    }
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  onDeleteAccount(): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      alert('No hay usuario autenticado.');
      return;
    }

    this.usersService.deleteAccount(currentUser.id_users)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          alert('Tu cuenta ha sido eliminada correctamente.');
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error?.message || 'Error al eliminar la cuenta.');
          console.error('Error deleting account:', error);
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(fieldName: string): string | null {
    const control = this.editProfileForm.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) {
      return `${fieldName.replace(/_/g, ' ')} es requerido`;
    }
    if (control.errors['email']) {
      return 'Email inválido';
    }
    if (control.errors['minLength']) {
      return `Mínimo ${control.errors['minLength'].requiredLength} caracteres`;
    }
    if (control.errors['pattern']) {
      if (fieldName === 'phone_number') {
        return 'Teléfono inválido (9-15 dígitos)';
      }
      if (fieldName === 'user_zipcode') {
        return 'Código postal inválido (4-6 dígitos)';
      }
    }
    if (control.errors['minAge']) {
      return `Debes tener al menos ${control.errors['minAge'].requiredAge} años`;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
