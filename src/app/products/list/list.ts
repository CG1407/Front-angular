import { Component } from '@angular/core';
import { Products } from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  products: any[] = [];
  error = '';

  constructor(private productsService: Products, private router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAll().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
      }
    });
  }

  deleteProduct(id: string) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productsService.delete(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: () => {
          this.error = 'Error al eliminar producto';
        }
      });
    }
  }

  editProduct(id: string) {
    this.router.navigate(['/products/edit', id]);
  }
}
