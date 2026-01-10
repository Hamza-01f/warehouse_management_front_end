// warehouse.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminWarehouse } from '../../services/admin-warehouse';
import { AdminUser } from '../../services/admin-user';
import { Warehouse, WarehouseRequestDTO, WarehouseResponseDTO } from '../../../../../core/model/warehouse.model';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './warehouse.html',
  styleUrls: ['./warehouse.scss']
})

export class WarehouseComponent implements OnInit {

  private warehouseService = inject(AdminWarehouse);
  private userService = inject(AdminUser);
  private fb = inject(FormBuilder);

  warehouses = signal<WarehouseResponseDTO[]>([]);
  filteredWarehouses = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    const warehouses = this.warehouses();
    
    if (!searchTerm) return warehouses;
    
    return warehouses.filter(warehouse =>
      warehouse.name.toLowerCase().includes(searchTerm) ||
      warehouse.city.toLowerCase().includes(searchTerm) ||
      warehouse.address.toLowerCase().includes(searchTerm)
    );
  });
  
  searchTerm = signal<string>('');
  isLoading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  managers = signal<any[]>([]);
  currentWarehouseId = signal<number | null>(null);

  warehouseForm!: FormGroup;

  // Pagination
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(12);
  totalItems = computed(() => this.filteredWarehouses().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
  paginatedWarehouses = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.filteredWarehouses().slice(startIndex, endIndex);
  });

  ngOnInit(): void {
    this.initializeForm();
    this.loadWarehouses();
    this.loadManagers();
  }

  private initializeForm(): void {
    this.warehouseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      managerId: [''],
      status: ['active', [Validators.required]]
    });
  }

  loadWarehouses(): void {
    this.isLoading.set(true);
    this.warehouseService.getAllWarehouses().subscribe({
      next: (data) => {
        this.warehouses.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.isLoading.set(false);
      }
    });
  }

  loadManagers(): void {
    this.userService.getManagers().subscribe({
      next: (data) => {
        this.managers.set(data);
      },
      error: (error) => {
        console.error('Error loading managers:', error);
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  openAddModal(): void {
    this.isEditMode.set(false);
    this.warehouseForm.reset({
      name: '',
      address: '',
      city: '',
      managerId: '',
      status: 'active'
    });
    this.showModal.set(true);
  }

  openEditModal(warehouse: Warehouse): void {
    this.isEditMode.set(true);
    this.currentWarehouseId.set(warehouse.id);
    
    this.warehouseForm.patchValue({
      name: warehouse.name,
      address: warehouse.address,
      city: warehouse.city,
      managerId: warehouse.managerId || '',
      status: warehouse.isActive ? 'active' : 'inactive'
    });
    
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.warehouseForm.reset();
    this.currentWarehouseId.set(null);
  }

  onSubmit(): void {
    if (this.warehouseForm.invalid) {
      this.markFormGroupTouched(this.warehouseForm);
      return;
    }

    const formValue = this.warehouseForm.value;
    const warehouseData: WarehouseRequestDTO = {
      name: formValue.name,
      address: formValue.address,
      city: formValue.city,
      // managerId: formValue.managerId ? Number(formValue.managerId) : undefined,
      managerId: formValue.managerId,
    };

    if (this.isEditMode() && this.currentWarehouseId()) {
      this.warehouseService.updateWarehouse(this.currentWarehouseId()!, warehouseData)
        .subscribe({
          next: (updatedWarehouse) => {
            const index = this.warehouses().findIndex(w => w.id === updatedWarehouse.id);
            if (index !== -1) {
              this.warehouses.update(warehouses => [
                ...warehouses.slice(0, index),
                updatedWarehouse,
                ...warehouses.slice(index + 1)
              ]);
            }
            this.closeModal();
          },
          error: (error) => {
            console.error('Error updating warehouse:', error);
          }
        });
    } else {
      this.warehouseService.createWarehouse(warehouseData)
        .subscribe({
          next: (newWarehouse) => {
            this.warehouses.update(warehouses => [newWarehouse, ...warehouses]);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating warehouse:', error);
          }
        });
    }
  }

  deleteWarehouse(id: number): void {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      this.warehouseService.deleteWarehouse(id).subscribe({
        next: () => {
          this.warehouses.update(warehouses => 
            warehouses.filter(warehouse => warehouse.id !== id)
          );
        },
        error: (error) => {
          console.error('Error deleting warehouse:', error);
        }
      });
    }
  }

  toggleWarehouseStatus(id: number, isActive: boolean): void {
    if (isActive) {
      this.warehouseService.deleteWarehouse(id).subscribe({
        next: () => {
          this.warehouses.update(warehouses =>
            warehouses.map(warehouse =>
              warehouse.id === id ? { ...warehouse, isActive: false } : warehouse
            )
          );
        }
      });
    } else {
      this.warehouseService.activateWarehouse(id).subscribe({
        next: () => {
          this.warehouses.update(warehouses =>
            warehouses.map(warehouse =>
              warehouse.id === id ? { ...warehouse, isActive: true } : warehouse
            )
          );
        }
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'status-active' : 'status-inactive';
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Active' : 'Inactive';
  }

  get endItem(): number {
  return Math.min(
    this.currentPage() * this.itemsPerPage(),
    this.totalItems()
  );
}
}