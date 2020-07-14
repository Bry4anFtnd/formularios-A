import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
// importaciones necesarias para trabjar con los forms reactivos, el formGroup va ser el tipo de la variable q creemos para contolar el formulario
// en este caso forma, y formBuilder lo importamos como private en el constructor y lo creamos como esta abajo en crearFormulario()

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
    // llamamos esta funcion cuando se abre el componente apra q me cree todos los datos, nombre apellido correo
  }

  ngOnInit(): void {}

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
    // todas estas funciones me devuelven un booleano q en el html lo va a evaluar a ver si hay un errror
    // osea si todas esas validaciones son verdadera es comosi retornara true y me marca la clase invalida en el html
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido() {
    return (
      this.forma.get('usuario').invalid && this.forma.get('usuario').touched
    );
  }

  get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito').invalid &&
      this.forma.get('direccion.distrito').touched
    );
  }

  get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad').invalid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return pass1 === pass2 ? false : true;
    // si los 2 campos son inguales retorna falso osea q no se ponde la clase invalida
  }

  crearFormulario() {
    this.forma = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this.validadores.noHerrera]], // aca usamos el metodo personalizado
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', [Validators.required]],
        pass2: ['', [Validators.required]],
        direccion: this.fb.group({
          distrito: ['', [Validators.required]],
          ciudad: ['', [Validators.required]],
        }),
        pasatiempos: this.fb.array([]),
      },
      {
        validators: [this.validadores.passwordsIguales('pass1', 'pass2')],
        // a diferencia de este llamado de validacion this.validadores.noHerrera q no necesita llaves, en esta lo hacemos pq esa funcion me devuelve otra funcion
        // para validar el formulario
      }
    );
  }

  // esta funciona la creamos para estar pendiente de los cambios q hayan en el formulario,
  crearListeners() {
    this.forma.valueChanges.subscribe((valor) => {
      console.log(valor);
    });
    this.forma.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }

  cargarDataAlFormulario() {
    this.forma.reset({
      nombre: 'Bryan',
      apellido: 'Arias',
      correo: 'brayank012@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Pedrera',
        ciudad: 'Copacabana',
      },
      pasatiempos: '',
    });
    // esta funcion me sirve para cargar datos por defecto al formulario como si fuera el placeholder pero ya establecidos
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }
  // con esta funcion podemos agregar dinamicamente un nueevo campo de pasatiempos, 'pasatiempos' seria la funcion de arriba y retirna todo esto
  // this.forma.get('pasatiempos') as FormArray, ose q accdemeos a toda la informacion de pasatiempo q seria como un array y todas sus caracteristicas

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    // esta funcion sirve al momento de darle enviar y no se ha llenado ningun campo aparezcan con error, ya que si no hemos llenado nada
    // no tenemos como validar todo los errores q se hicieron, osea me va marcar todos los campos como tocados y una de las conidiones para q me de error es
    // q este tocado y no sea valido, pero tambien tenemos un formGroup osea q tiene objetos hijos como son distrito y ciudad hay q hacerlo asi para
    // q tambn me marque esos hijos como no tocados
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((ctrl) => {
            ctrl.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
    // posteo de informacion
    this.forma.reset({});
  }
}
