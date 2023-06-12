import { AfterViewInit, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listado-paciente',
  templateUrl: './listado-paciente.component.html',
  styleUrls: ['./listado-paciente.component.css']
})
export class ListadoPacienteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['cedulaPaciente', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'correo', 'telefonoPaciente', 'telefonoContacto', 'genero', 'provinciaId', 'acciones'];
  dataSource = new MatTableDataSource<Paciente>();
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _pacienteService:PacienteService) {
  }

    ngOnInit(): void {
      this.obtenerPacientes();

      
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      if(this.dataSource.data.length > 0){
        this.dataSource.sort = this.sort;
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    eliminarPaciente(id: number){
      this.loading = true;

      this._pacienteService.deletePaciente(id).subscribe(() => {
        this.mensajeExito();
        this.loading = false;
        this.obtenerPacientes();
      });

    }

    mensajeExito() {
      this._snackBar.open('El paciente se elimino con exito', '', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    }

    obtenerPacientes() {
      this.loading = true;
      this._pacienteService.getPacientes().subscribe({
        next: (data) => {
          this.loading = false;
          this.dataSource.data = data;
        },
        error: (e) => this.loading = false,
        complete: () => console.info('complete')
      })
    }
}
