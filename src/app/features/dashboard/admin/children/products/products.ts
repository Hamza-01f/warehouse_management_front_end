import { Component, OnInit } from '@angular/core';
import { AdminProduct } from '../../services/admin-product';
import { Product } from '../../../../../core/model/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule , FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit{
    
  products: Product[] = [];

  showProductForm = false;

  selectedProductId?: number;

  isEditMode = false;

  productForm: Product = this.emptyProduct();

  constructor(private product: AdminProduct){}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void{
          this.product.getProducts().subscribe({
           next: (data) => this.products = data,
           error: (err) => console.error(err)
      
      });
      console.log(this.products)
  }


  private emptyProduct(): Product{
    return {
    name: '',
    image: '',
    price: 0,
    unit: '',
    quantity: 0,
   };
  }


  /* ---------- MODAL ---------- */

  openAddForm(): void{
    this.isEditMode = false;
    this.emptyProduct();
    this.showProductForm = true;
  }

  openEditForm(product: Product): void {
    this.isEditMode = true;
    this.selectedProductId = product.id;
    this.productForm = { ...product };
    this.showProductForm = true;
  }

  closeForm(): void {
    this.showProductForm = false;
    this.selectedProductId = undefined;
  }


  /* ---------- SAVE ---------- */

  // resetForm(){
  //   this.productForm = {
  //     name: '',
  //     image: '',
  //     price: 0,
  //     unit: '',
  //     quantity: 0,
  //   }
  // }

  submit(form: NgForm): void{
     if(form.invalid){
      return
     }

     console.log(form)
     const action$ =  this.isEditMode 
     ?  this.product.updateProduct(this.selectedProductId! , this.productForm)
     : this.product.createProduct(this.productForm);

     action$.subscribe({
      next: () => {
        this.loadProducts();
        this.closeForm();
      },
      error: (err) => console.error(err),
     });
  }

  /* ---------- DELETE ---------- */

  deleteProduct(id: number): void {
    if (!confirm('Delete this product?')) return;

    this.product.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: err => console.error(err),
    });
  }

  /* ---------- ACTIVATE / DEACTIVATE ---------- */

  toggleStatus(product: Product): void {
    if (!product.isActive) {
      this.product.activateProduct(product.id!).subscribe({
        next: () => this.loadProducts(),
        error: err => console.error(err),
      });
    }
  }

}
