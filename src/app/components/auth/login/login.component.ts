import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthLogin } from 'src/app/models/authLogin';
import { AuthService } from 'src/app/services/auth.service';
import { HelperGlobalService } from 'src/app/services/helperGlobal.service';
import { LocalService } from 'src/app/services/localService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _localService: LocalService,
    private _helperGlobal: HelperGlobalService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    const AuthL: AuthLogin = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    this._authService.login(AuthL).subscribe(data => {
      if (this._helperGlobal.validateFormApi(data)) {
        this.setLocalStorage(data.data.token, 'user-token');
        this.setLocalStorage(data.data.username, 'username');
        this.setLocalStorage(data.data.admin, 'admin');
        this.toastr.success('Ingreso correctamente', '¡Proceso exitoso!');
        this.router.navigate(['home']);
      }
    }, error => {
      console.log(error);
      this.loginForm.reset();
      this.toastr.error(
        'Por favor contactar al administrador del sistema',
        '¡Hubo un fallo en el proceso!'
      );
    });
  }

  setLocalStorage(token: string, key: string) {
    this._localService.setJsonValue(key, token);
  }

  ngOnInit(): void {
  }
}
