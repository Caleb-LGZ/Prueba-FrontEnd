import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Paciente/';

  constructor(private http: HttpClient) {
   }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  getPaciente(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deletePaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.myAppUrl}${this.myApiUrl}`, paciente);
  } 

  updatePaciente(id: number, paciente: Paciente): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, paciente);
  }
}