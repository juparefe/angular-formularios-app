import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: []
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    'nombre': [null, [Validators.required, Validators.minLength(3)]],
    'favoritos': this.fb.array([
      ['mario'],
      ['fifa']
    ],
    Validators.required)
  });
  
  nuevofavorito: FormControl = new FormControl('', Validators.required);

  get favoritosArray() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  validarCampo(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  agregarFavorito() {
    if (this.nuevofavorito.invalid) {
      return
    }
    // Usando FormControl:
    // this.favoritosArray.controls.push(new FormControl(this.nuevofavorito.value, Validators.required));

    //Usando FormBuilder:
    this.favoritosArray.push(this.fb.control(this.nuevofavorito.value, Validators.required));
    this.nuevofavorito.reset();
  }

  eliminar(index: number) {
    this.favoritosArray.removeAt(index);
  }
}
