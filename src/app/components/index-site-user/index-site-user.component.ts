import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-index-site-user',
  templateUrl: './index-site-user.component.html',
  styleUrls: ['./index-site-user.component.css']
})
export class IndexSiteUserComponent implements OnInit {
  id: string | null;
  listUsers: User[] = [];
  page: number = 0;

  constructor(
    private aRouter: ActivatedRoute,
    private _siteService: SiteService,
    private toastr: ToastrService
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  getUsers() {
    if (this.id !== null) {
      this._siteService.getSitesUsers(this.id).subscribe(data => {
        if (data.state && Object.values(data.data).length > 0) {
          this.listUsers = data.data;
        } else {
          this.toastr.info('No se encontro clientes para esta sede', 'No hay registros');
        }
      })
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
