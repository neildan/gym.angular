import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/models/site';
import { User } from 'src/app/models/user';
import { UserEdit } from 'src/app/models/userEdit';
import { HelperGlobalService } from 'src/app/services/helperGlobal.service';
import { SiteService } from 'src/app/services/site.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  title = 'Crear Usuario';
  id: string | null;
  listSites: Site[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _siteService: SiteService,
    private aRouter: ActivatedRoute,
    private _helperGlobal: HelperGlobalService
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');

    let update = this.isEdit();
    if (typeof update == 'string') {
      this.userForm = this.fb.group({
        name: [''],
        lastname: [''],
        email: [''],
        password: [''],
        admin: [''],
        siteId: ['']
      });
    } else {
      this.userForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        admin: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
        siteId: ['', [Validators.required, Validators.min(1)]]
      });
    }
  }

  actionForm() {
    let updateUser = this.isEdit();
    if (typeof updateUser == 'string') {
      this.update(updateUser);
    } else {
      this.create();
    }
  }

  update(updateUser: string) {
    const USER: UserEdit = {};

    if (this.userForm.get('name')?.value) USER.name = this.userForm.get('name')?.value;
    if (this.userForm.get('lastname')?.value) USER.lastname = this.userForm.get('lastname')?.value;
    if (this.userForm.get('email')?.value) USER.email = this.userForm.get('email')?.value;
    if (this.userForm.get('password')?.value) USER.password = this.userForm.get('password')?.value;
    if (this.userForm.get('admin')?.value) USER.admin = (this.userForm.get('admin')?.value == 1) ? true : false;
    if (this.userForm.get('siteId')?.value) USER.siteId = this.userForm.get('siteId')?.value;

    this._userService.updateUser(updateUser, USER).subscribe(data => {
      if (this._helperGlobal.validateFormApi(data)) {
        this.toastr.success('El usuario fue actualizado correctamente', '¡Proceso exitoso!');
        this.router.navigate(['/users']);
      }
    }, error => {
      console.log(error);
      this.userForm.reset();
    })
  }

  create() {
    const USER: User = {
      name: this.userForm.get('name')?.value,
      lastname: this.userForm.get('lastname')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      admin: (this.userForm.get('admin')?.value == 1) ? true : false,
      siteId: this.userForm.get('siteId')?.value
    }
    this._userService.saveUser(USER).subscribe(data => {
      if (this._helperGlobal.validateFormApi(data)) {
        this.toastr.success('El usuario fue creado correctamente', '¡Proceso exitoso!');
        this.router.navigate(['/users']);
      }
    }, error => {
      console.log(error);
      this.userForm.reset();
    })
  }

  isEdit() {
    let response: string | null;
    if (this.id !== null) {
      response = this.id;
    } else {
      response = null;
    }
    return response;
  }

  setValuesForm() {
    var userUpdate = this.isEdit();
    if (typeof userUpdate == 'string') {
      this.title = 'Editar Usuario';
      this._userService.getUser(userUpdate).subscribe(data => {
        if (data.state && data.data) {
          let user = data.data;
          this.userForm.setValue({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: null,
            admin: null,
            siteId: null
          })
          this.userForm.controls['admin'].setValue((user.admin) ? 1 : 0);
          this.userForm.controls['siteId'].setValue(user.siteId);
        } else {
          this.toastr.error(data.msj, '¡Error al cargar formulario!');
        }
      })
    }
  }

  getSites() {
    this._siteService.getSites().subscribe(data => {
      if (!data.data) {
        this.userForm.controls['siteId'].disable();
        this.toastr.error('No hay sedes disponibles', '¡No es posible crear usuario!');
      } else {
        this.listSites = data.data;
      }
    })
  }

  ngOnInit(): void {
    this.getSites();
    this.setValuesForm();
  }
}
