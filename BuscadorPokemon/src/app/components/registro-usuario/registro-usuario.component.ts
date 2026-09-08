import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Usuario {
    id : number;
    nombreCompleto : string;
    tipo : string;
    numero : string;
    FechaNacimiento : string;
    celular : string;
    correo : string;
    pais : string;
    ciudad : string;
    datosPersonales : boolean;
    fechaRegistro : string;
}



@Component({
  imports: [FormsModule],
  selector: 'app-registro-usuario',
  standalone: true,
  styleUrl: './registro-usuario.component.css',
  templateUrl: './registro-usuario.component.html',
})
export class RegistroUsuarioComponent {
  nombre = signal('');
  apellido = signal('');
  tipo_identificacion = signal('');
  numero_identificacion = signal('');
  fecha_nacimiento = signal('');
  celular = signal('');
  correo = signal('');
  pais = signal('');
  ciudad = signal('');
  politica_datos = signal(false);
  
  
  ultimoUsuarioRegistrado = signal<Usuario | null>(null);

  guardarUsuario() {
    if(!this.politica_datos()) {
      alert('Debes aceptar la política de datos para continuar.');
    }
    
    const usuarioCreado = {
    id : Date.now(),
    nombreCompleto : `${this.nombre()} ${this.apellido()}`,
    tipo : this.tipo_identificacion(),
    numero : this.numero_identificacion(),
    FechaNacimiento : this.fecha_nacimiento(),
    celular : this.celular(),
    correo : this.correo(),
    pais : this.pais(),
    ciudad : this.ciudad(),
    datosPersonales : this.politica_datos(),
    fechaRegistro : new Date().toLocaleDateString()
                    };

this.ultimoUsuarioRegistrado.set(usuarioCreado);

localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));
                  } 
                }