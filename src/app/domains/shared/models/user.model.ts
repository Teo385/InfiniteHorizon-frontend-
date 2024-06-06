import { Empleado } from "./employee.model";
import { Estudiante } from "./student.model";
import { Profesor } from "./teacher.model";

export interface User {
    idUsuario:       number;
    nombre:          string;
    apellido:        string;
    cedula:          string;
    contrasena:      string;
    fechaNacimiento: Date;
    genero:          Genero;
    direccion:       string;
    correo:          string;
    telefono:        string;
    profesor?:       Profesor;
    estudiante?:     Estudiante;
    empleado?:       Empleado;
}

export enum Genero {
    F = "F",
    M = "M",
}

