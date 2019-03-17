import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'Dereck',
      apellido: 'Curtis'
    },
    correo: 'drkjavier@gmail.com'
  };

  constructor() {
    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl(this.usuario.nombrecompleto.nombre, [ Validators.required, Validators.minLength(3) ]),
        'apellido': new FormControl(this.usuario.nombrecompleto.apellido, [ Validators.required, Validators.minLength(3) ])
      }),
      'correo': new FormControl(this.usuario.correo, [  Validators.required,  
                                                        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ])
    });
   }
  ngOnInit() {
  }

  guardarCambios () {
    console.log(this.forma);

    this.forma.reset({
      nombrecompleto: {
        nombre: "",
        apellido: ""
      },
      correo: ""
    });
  }

  guardarPasatiempos() {
      (<FormArray> this.forma.controls['pasatiempos']).push(new FormControl('Dormir', Validators.required));
  }

  cleanForm () {
    this.forma.reset(this.usuario);
  }
}
