import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { EmpleadoService } from '../../interfaces/services/empleado';
import { empleado } from '../../interfaces/empleados';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './crear-empleado.html',
  styleUrl: './crear-empleado.css'
})

export class CrearEmpleado {

  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);

  empleado: empleado = {

    id:0,
    nombre:'',
    apellido:'',
    correo:'',
    telefono:'',
    cargo:'',
    salario:'',
    fecha_ingreso:'',
    created_at:''

  };

  guardarEmpleado() {

  this.empleadoService.crearEmpleado(this.empleado).subscribe({

    next: () => {

      Swal.fire({

        icon: 'success',
        title: 'Empleado creado',
        text: 'El empleado fue registrado correctamente.',
        confirmButtonColor: '#2563EB'

      }).then(() => {

        this.router.navigate(['/dashboard']);

      });

    },

    error: (error) => {

      console.error(error);

      Swal.fire({

        icon: 'error',
        title: 'Error',
        text: 'No fue posible registrar el empleado.',
        confirmButtonColor: '#DC2626'

      });

    }

  });

}

}