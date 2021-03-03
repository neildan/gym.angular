import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRegister } from 'src/app/models/authRegister';
import { AuthService } from 'src/app/services/auth.service';
import { HelperGlobalService } from 'src/app/services/helperGlobal.service';
import { LocalService } from 'src/app/services/localService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _helperGlobal: HelperGlobalService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    try {
      if (this.validationSamePasswords()) throw 'Las contraseñas no coinciden';
      const AuthR: AuthRegister = {
        name: this.registerForm.get('name')?.value,
        lastname: this.registerForm.get('lastname')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      }
      this._authService.register(AuthR).subscribe(data => {
        if (this._helperGlobal.validateFormApi(data)) {
          this.toastr.success('Se registro correctamente', '¡Proceso exitoso!');
          this.router.navigate(['login']);
        }
      }, error => {
        console.log(error);
        this.registerForm.reset();
        this.toastr.error(
          'Por favor contactar al administrador del sistema',
          '¡Hubo un fallo en el proceso!'
        );
      });
    } catch (msj) {
      this.toastr.error(msj, '¡Formulario Invalido!');
    }
  }

  validationSamePasswords() {
    let response = false;
    if (
      this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value &&
      this.registerForm.get('password2')?.touched
    ) response = true;
    return response;
  }

  ngOnInit(): void {
  }
}
