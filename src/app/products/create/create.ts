import { Component } from '@angular/core';
import { Products } from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {
  name = '';
  error = '';

  constructor(private productsService: Products, private router: Router) {}

  createProduct() {
    this.productsService.create({ name: this.name }).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.error = 'Error al crear producto';
      }
    });
  }
}
