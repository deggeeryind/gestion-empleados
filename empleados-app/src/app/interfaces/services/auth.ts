import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private api = 'https://gestion-empleados-a69i.onrender.com/api/auth';

  login(datos: any) {
    return this.http.post(`${this.api}/login`, datos);
  }

}