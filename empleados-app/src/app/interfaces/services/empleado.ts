import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { empleado } from '../empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);

  private api = 'https://gestion-empleados-a69i.onrender.com/api/empleados';;

  obtenerEmpleados(): Observable<empleado[]>{

    return this.http.get<empleado[]>(this.api);

  };

  crearEmpleado(empleado: empleado): Observable<empleado>{

  return this.http.post<empleado>(this.api, empleado);

  }

   eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarEmpleado(id: number, empleado: empleado) {
  return this.http.put(`${this.api}/${id}`, empleado);
  }

  

}