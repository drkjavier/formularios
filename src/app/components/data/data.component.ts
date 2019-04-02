import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

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
        'apellido': new FormControl(this.usuario.nombrecompleto.apellido, [ Validators.required, Validators.minLength(3), this.noHerrera ])
      }),
      'correo': new FormControl(this.usuario.correo, [  Validators.required,  
                                                        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existsUser),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
        });

        this.forma.controls['password2'].setValidators([
          Validators.required, this.notEquals.bind(this.forma)
        ]);
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

  noHerrera (control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Curtis') {
      return {
        nocurtis: true
      };
    }
    return null;
  }
  notEquals (control: FormControl): {[s: string]: boolean} {
    if (control.value !== this.controls['password1'].value) {
      return {
        nocurtis: true
      };
    }
    return null;
  }

  existsUser (control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'strider') {
              resolve({existe: true});
          } else {
              resolve(null);
          }
        }, 3000);
    });
    return promise;
  }

  cleanForm () {
    this.forma.reset(this.usuario);
  }
}
