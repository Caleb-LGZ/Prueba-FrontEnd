import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListadoPacienteComponent } from './components/listado-paciente/listado-paciente.component';
import { AgregarEditarPacienteComponent } from './components/agregar-editar-paciente/agregar-editar-paciente.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';

const routes: Routes = [
  {path: '', redirectTo: 'listPacientes', pathMatch: 'full'},
  {path: 'listPacientes', component: ListadoPacienteComponent},
  {path: 'agregarPaciente', component: AgregarEditarPacienteComponent},
  {path: 'verPaciente/:id', component: VerPacienteComponent},
  {path: 'editarPaciente/:id', component: AgregarEditarPacienteComponent},
  {path: '**', redirectTo: 'listPacientes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
