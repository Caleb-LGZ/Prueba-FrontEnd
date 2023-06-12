import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarEditarPacienteComponent } from './components/agregar-editar-paciente/agregar-editar-paciente.component';
import { ListadoPacienteComponent } from './components/listado-paciente/listado-paciente.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarPacienteComponent,
    ListadoPacienteComponent,
    VerPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
