import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { EmpleadoService } from '../interfaces/services/empleado';
import { empleado } from '../interfaces/empleados';

import { Sidebar } from './contenido/buscador/sidebar/sidebar';
import { Navbar } from './contenido/navbar/navbar';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Sidebar, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private empleadoService = inject(EmpleadoService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  empleados: empleado[] = [];

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = [...data];

        this.empleadosFiltrados = [...data];

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  guardarEmpleado() {
    if (this.editando) {
      this.empleadoService.actualizarEmpleado(this.nuevo.id, this.nuevo).subscribe({
        next: () => {
          this.obtenerEmpleados();

          this.cerrarModal();

          Swal.fire({
            icon: 'success',
            title: 'Empleado actualizado',
            text: 'Los datos fueron actualizados correctamente.',
            confirmButtonColor: '#2563EB',
          });
        },

        error: (error) => {
          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No fue posible actualizar el empleado.',
          });
        },
      });
    } else {
      this.empleadoService.crearEmpleado(this.nuevo).subscribe({
        next: () => {
          this.obtenerEmpleados();

          this.cerrarModal();

          Swal.fire({
            icon: 'success',
            title: 'Empleado registrado',
            text: 'El empleado fue creado correctamente.',
            confirmButtonColor: '#2563EB',
          });
        },

        error: (error) => {
          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No fue posible crear el empleado.',
          });
        },
      });
    }
  }

  nuevoEmpleado() {
    this.abrirModal();
  }

  mostrarModal = false;
  editando = false;

  abrirModal() {
    this.editando = false;

    this.mostrarModal = true;

    this.nuevo = {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      cargo: '',
      salario: '',
      fecha_ingreso: '',
      created_at: '',
    };
  }

  cerrarModal() {
    this.mostrarModal = false;

    this.editando = false;

    this.nuevo = {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      cargo: '',
      salario: '',
      fecha_ingreso: '',
      created_at: '',
    };
  }

  editarEmpleado(empleado: empleado) {
    this.editando = true;
    this.mostrarModal = true;
    this.nuevo = { ...empleado };
  }

  nuevo: empleado = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    cargo: '',
    salario: '',
    fecha_ingreso: '',
    created_at: '',
  };

  eliminarEmpleado(id: number) {
    this.empleados = this.empleados.filter((e) => e.id !== id);

    Swal.fire({
      title: '¿Eliminar empleado?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#DC2626',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Empleado eliminado',
              timer: 1500,
              showConfirmButton: false,
            });

            this.empleados = this.empleados.filter((empleado) => empleado.id !== id);
          },

          error: (error) => {
            console.error(error);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No fue posible eliminar el empleado.',
            });
          },
        });
      }
    });
  }

  buscarEmpleado() {
    const texto = this.textoBusqueda.toLowerCase().trim();

    this.empleadosFiltrados = this.empleados.filter(
      (e) =>
        e.nombre.toLowerCase().includes(texto) ||
        e.apellido.toLowerCase().includes(texto) ||
        e.correo.toLowerCase().includes(texto) ||
        e.cargo.toLowerCase().includes(texto),
    );
  }

  cerrarSesion() {

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);

}

  get totalNomina(): number {
    return this.empleados.reduce((total, empleado) => {
      return total + Number(empleado.salario);
    }, 0);
  }

  textoBusqueda = '';

  empleadosFiltrados: empleado[] = [];

  sidebarAbierto = false;

  toggleSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }
}
