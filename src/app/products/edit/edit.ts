import { Component } from '@angular/core';
import { Products } from '../products';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {
  id = '';
  name = '';
  error = '';

  constructor(
    private productsService: Products,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.loadProduct();
  }

  loadProduct() {
    this.productsService.getById(this.id).subscribe({
      next: (res) => {
        this.name = res.name;
      },
      error: () => {
        this.error = 'Error al cargar producto';
      }
    });
  }

  updateProduct() {
    this.productsService.update(this.id, { name: this.name }).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.error = 'Error al actualizar producto';
      }
    });
  }
}
