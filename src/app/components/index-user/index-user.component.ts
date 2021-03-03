import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {
  listUsers: User[] = [];
  page:number = 0;

  constructor(
    private _userService: UserService,
    private toastr: ToastrService
  ) { }

  getUsers() {
    this._userService.getUsers().subscribe(data => {
      if (!data.data) {
        this.toastr.info('No se encontraron registros', 'No hay usuarios');
      } else {
        this.listUsers = data.data;
      }
    }, error => {
      console.log(error)
    })
  }

  deleteUser(id: any) {
    this._userService.deleteUser(id).subscribe(data => {
      if (!data.state) {
        this.toastr.error(data.msj, '¡Fallo al eliminar!');
      } else {
        this.getUsers();
        this.toastr.success('El usuario fue eliminado correctamente', '¡Proceso exitoso!');
      }
    }, error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
