import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Bryan',
    apellido: 'Arias',
    correo: 'brayank012@gmail.com',
    pais: 'COL',
    genero: '',
  };

  paises: any[] = [];
  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe((paises) => {
      // console.log(paises);
      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione un pais]',
        coidgo: '',
      });
    });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    // tenemos que si forma q es el alias con el q accedemos a las propiedades de forms de angular es invalid, osea q no paso todas las validaciones
    // accedemos al Object y sus valores mediante el alias y a los controls, hacemos un forEach con el q accedemos a todos los datos, osea nombre, apellido
    // y usuario y a cada uno de esos le decimos q markAsTouched(), osea que ya ha sido tocado para poder q me muestre el error, hay mas formas de hacerlo,
    console.log(forma.value);
  }
}
