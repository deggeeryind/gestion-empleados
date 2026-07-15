import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../interfaces/services/empleado';
import { empleado } from '../../interfaces/empleados';

@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-empleados.html',
  styleUrl: './lista-empleados.css',
})
export class ListaEmpleados implements OnInit {

  private empleadoService = inject(EmpleadoService);

  empleados: empleado[] = [];

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        console.log(data);
        this.empleados = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}