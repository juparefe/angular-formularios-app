import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    'nombre': [null, [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    'email': [null, [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    'username': [null, [Validators.required, this.validatorService.noPuedeSerStrider]],
    'password': [null, [Validators.required, Validators.minLength(6)]],
    'password2': [null, [Validators.required, this.validatorService.noPuedeSerStrider]]
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })
  
  get emailErrorMessage(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'El campo email es obligatorio'
    } else if ( errors?.['pattern'] ) {
      return 'El valor ingresado no tiene el formato de correo'
    } else {
      return 'El correo ingresado ya se encuentra en la base de datos'
    }
  };

  constructor(private fb: FormBuilder, 
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      'nombre': 'Juan Rendon',
      'email': 'prueba@gmail.com',
      'username': 'juparefe',
      'password': '123456',
      'password2': '123456'
    });
  }

  validarCampo(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  // emailRequired() {
  //   return ((this.miFormulario.get('email')?.errors?.['required']) && (this.miFormulario.get('email')?.touched));
  // }

  // emailFormato() {
  //   return ((this.miFormulario.get('email')?.errors?.['pattern']) && (this.miFormulario.controls['email']?.touched));
  // }

  // emailTomado() {
  //   return ((this.miFormulario.get('email')?.errors?.['emailTomado']) && (this.miFormulario.controls['email']?.touched));
  // }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
