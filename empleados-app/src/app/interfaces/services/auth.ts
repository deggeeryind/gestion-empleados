import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private api = 'http://localhost:3000/api/auth';

  login(datos: any) {
    return this.http.post(`${this.api}/login`, datos);
  }

}