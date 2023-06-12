import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-agregar-editar-paciente',
  templateUrl: './agregar-editar-paciente.component.html',
  styleUrls: ['./agregar-editar-paciente.component.css']
})
export class AgregarEditarPacienteComponent implements OnInit{

  loading: boolean = false;
  form: FormGroup
  provinciaSeleccionada: string;
  generoSeleccionado: string;
  id: number;
  titulo: string = 'Ingreso datos ';

  constructor(private fb: FormBuilder,
    private _pacienteService: PacienteService, 
    private _snackBar: MatSnackBar, 
    private router: Router,
    private aRoute: ActivatedRoute) 
    {

    this.provinciaSeleccionada = '';
    this.generoSeleccionado = '';

    this.form = this.fb.group({
      cedulaPaciente: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      correo: ['', Validators.required],
      telefonoPaciente: ['', Validators.required],
      telefonoContacto: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      provincia: ['', Validators.required] 
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void {
    if(this.id != 0) {
      this.titulo = 'Editar';
      this.obtenerPaciente(this.id);
    }
  }

  obtenerPaciente(id: number) {
    this.loading = true;
    this._pacienteService.getPaciente(id).subscribe(data => {
      this.form.setValue({
        cedulaPaciente: data.cedulaPaciente,
        primerNombre: data.primerNombre,
        segundoNombre: data.segundoNombre,
        primerApellido: data.primerApellido,
        segundoApellido: data.segundoApellido,
        telefonoPaciente: data.telefonoPaciente,
        telefonoContacto: data.telefonoContacto,
        correo: data.correo,
        genero: data.genero,
        fechaNacimiento: data.fechaNacimiento,
        provincia: data.provincia.nombre
      })
      console.log(data)
      const cedulaElement = document.getElementById("cedula") as HTMLInputElement | null;
      if (cedulaElement) {
        cedulaElement.readOnly = true;
      }
      this.loading = false;
    })
  }

  agregarEditarPaciente(){
    // const nombre = this.form.get('nombre')?.value;

    const nombreProvincia = this.form.value.provincia;

    // Mapear el nombre de la provincia al ID correspondiente
    let provinciaIds: number = 0;
    switch (nombreProvincia) {
      case 'San Jose':
        provinciaIds = 1;
        break;
      case 'Alajuela':
        provinciaIds = 2;
        break;
      case 'Cartago':
        provinciaIds = 3;
        break;
      case 'Heredia':
        provinciaIds = 4;
        break;
      case 'Guanacaste':
        provinciaIds = 5;
        break;
      case 'Puntarenas':
        provinciaIds = 6;
        break;
      case 'Limon':
        provinciaIds = 7;
        break;
      default:
        // Manejar el caso de provincia desconocida o no seleccionada
        // Puedes mostrar un mensaje de error o establecer un valor predeterminado
        break;
    }

    const paciente: Paciente = {
      cedulaPaciente: this.form.value.cedulaPaciente,
      primerNombre: this.form.value.primerNombre,
      segundoNombre: this.form.value.segundoNombre,
      primerApellido: this.form.value.primerApellido,
      segundoApellido: this.form.value.segundoApellido,
      telefonoPaciente: this.form.value.telefonoPaciente,
      telefonoContacto: this.form.value.telefonoContacto,
      correo: this.form.value.correo,
      genero: this.form.value.genero,
      fechaNacimiento: this.form.value.fechaNacimiento,
      provincia: {
        provinciaId: provinciaIds,
        nombre: ''
      }
    }

    if(this.id != 0) {
      this.editarPaciente(this.id, paciente);
      this.router.navigate(["/listPacientes"]);
    }else {
    this.agregarPaciente(paciente);
    this.router.navigate(["/listPacientes"]);
  }
  }

  agregarPaciente(paciente: Paciente) {
    this._pacienteService.addPaciente(paciente).subscribe(() => {
      this.mensajeExito("registrada");
      this.router.navigate(['/listPacientes']);
    })
  }

  editarPaciente(id: number, paciente: Paciente) {
    this.loading = true;
    this._pacienteService.updatePaciente(id, paciente).subscribe(data => {
      this.mensajeExito("actualizada");
        this.loading = false;
    })
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`El paciente se ${texto} con exito`, '', {
      duration: 2000,
      horizontalPosition: 'right'
    });
  }

}