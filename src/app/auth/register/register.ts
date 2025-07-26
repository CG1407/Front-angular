import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  register() {
    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrarse';
      }
    });
  }
}
