export interface Paciente {
    cedulaPaciente: number,
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    correo: string,
    telefonoPaciente: number,
    telefonoContacto: number,
    genero: string,
    fechaNacimiento: Date,
    provincia: {
        provinciaId: number,
        nombre: string
      }
}