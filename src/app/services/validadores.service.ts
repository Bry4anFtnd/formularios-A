import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  existeUsuario(
    control: FormControl
  ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

  noHerrera(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true,
      };
    }
    return null;
  }

  // funcion para validar q los 2 passw sean validos, lo q se hizo en el html fue la validacion visual pero seguia siendo valido el form, ahora ya sera falso
  // si no son iguales
  passwordsIguales(pass1Name: string, pass2Name) {
    return (FormGroup: FormGroup) => {
      const pass1Control = FormGroup.controls[pass1Name];
      const pass2Control = FormGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
  // formGroup es toda la informacion y caracteristicas q tiene el formulario en el momento
}
