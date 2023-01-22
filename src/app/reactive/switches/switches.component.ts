import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: []
})
export class SwitchesComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    genero: ['F', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    });

    //Para actualizar automaticamente el objeto persona cada que hago un cambio
    //Usando delete
    // this.miFormulario.valueChanges.subscribe(form => {
    //   delete form.condiciones;
    //   this.persona = form;
    // });

    //Usando desestructuracion
    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) => {
      this.persona = rest;
    })    
  }

  guardar() {
    if (this.miFormulario.invalid) {
      return
    }
    const formValue = {...this.miFormulario.value}
    delete formValue.condiciones;
    console.log(formValue);
    this.persona = formValue;
  }
}
