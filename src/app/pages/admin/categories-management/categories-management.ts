import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm';
import { ToastComponent, ToastType } from '../../../shared/components/toast/toast';

// DEMO -> use interface Category
interface CategoryRow {
  id: number;
  name: string;
  description: string;
  items: number;
}

@Component({
  selector: 'app-categories-management',
  standalone: true,
  imports: [FormsModule, ModalConfirmComponent, ToastComponent],
  templateUrl: './categories-management.html',
  styleUrl: './categories-management.css'
})
export class CategoriesManagementComponent {
  categories: CategoryRow[] = [
    { id: 1, name: 'Electronics', description: 'Phones, laptops and digital devices', items: 83 },
    { id: 2, name: 'Home', description: 'Furniture, decoration and home supplies', items: 41 },
    { id: 3, name: 'Sports', description: 'Sport equipment and outdoor products', items: 26 },
  ];

  searchTerm = '';
  editingId: number | null = null;
  categoryToDelete: CategoryRow | null = null;
  toast = { visible: false, type: 'success' as ToastType, title: '', message: '' };

  form = {
    name: '',
    description: '',
  };

  get filteredCategories(): CategoryRow[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.categories;
    }

    return this.categories.filter(category =>
      category.name.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );
  }

  saveCategory(): void {
    const name = this.form.name.trim();
    const description = this.form.description.trim();

    if (!name || !description) {
      this.showToast('warning', 'Missing fields', 'Name and description are required.');
      return;
    }

    if (this.editingId) {
      this.categories = this.categories.map(category =>
        category.id === this.editingId ? { ...category, name, description } : category
      );
      this.showToast('success', 'Category updated', `${name} has been updated.`);
    } else {
      const nextId = Math.max(...this.categories.map(category => category.id), 0) + 1;
      this.categories = [...this.categories, { id: nextId, name, description, items: 0 }];
      this.showToast('success', 'Category created', `${name} has been added.`);
    }

    this.resetForm();
  }

  editCategory(category: CategoryRow): void {
    this.editingId = category.id;
    this.form = {
      name: category.name,
      description: category.description,
    };
  }

  askDelete(category: CategoryRow): void {
    this.categoryToDelete = category;
  }

  confirmDelete(): void {
    if (!this.categoryToDelete) {
      return;
    }

    const deletedName = this.categoryToDelete.name;
    this.categories = this.categories.filter(category => category.id !== this.categoryToDelete?.id);
    this.categoryToDelete = null;
    this.showToast('success', 'Category deleted', `${deletedName} has been removed.`);
  }

  resetForm(): void {
    this.editingId = null;
    this.form = { name: '', description: '' };
  }

  private showToast(type: ToastType, title: string, message: string): void {
    this.toast = { visible: true, type, title, message };
  }
}
