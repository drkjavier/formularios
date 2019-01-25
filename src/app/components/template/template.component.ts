import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent {

  public usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null
  };
  constructor() { }

  guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('forma: ', forma);
    console.log('value: ', forma.value);
    console.log('usuario: ', this.usuario);
  }

}
