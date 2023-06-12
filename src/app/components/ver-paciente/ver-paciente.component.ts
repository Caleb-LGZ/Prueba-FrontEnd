import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { parseISO, differenceInYears } from 'date-fns';


@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})
export class VerPacienteComponent {
  id: number;
  paciente!: Paciente;
  loading: boolean = false;
  edad!: number;
  fechaActual = new Date();

  constructor(private _pacienteService: PacienteService, 
    private aRoute: ActivatedRoute) {
      this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void{
    this.obtenerPaciente();
  }

  obtenerPaciente() {
    this.loading = true;
    this._pacienteService.getPaciente(this.id).subscribe(data => {
      this.paciente = data;
      this.loading = false;
      const fechaNacimiento = new Date(data.fechaNacimiento)
      this.edad = differenceInYears(this.fechaActual, fechaNacimiento);
    })
  }

}