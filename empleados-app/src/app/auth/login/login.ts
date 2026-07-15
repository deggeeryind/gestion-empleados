import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../interfaces/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  mostrarPassword = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (respuesta: any) => {
        localStorage.setItem('token', respuesta.token);

        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: respuesta.usuario.nombre,
          timer: 1500,
          showConfirmButton: false,
        });

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.mensaje,
        });
      },
    });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
