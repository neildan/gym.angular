import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-index-site',
  templateUrl: './index-site.component.html',
  styleUrls: ['./index-site.component.css']
})
export class IndexSiteComponent implements OnInit {
  listSites: Site[] = [];
  page:number = 0;

  constructor(
    private _siteService: SiteService,
    private toastr: ToastrService
  ) { }

  getSites() {
    this._siteService.getSites().subscribe(data => {
      if (!data.data) {
        this.toastr.info('No se encontraron registros', 'No hay sedes');
      } else {
        this.listSites = data.data;
      }
    }, error => {
      console.log(error)
    })
  }

  deleteSite(id: any) {
    this._siteService.deleteSite(id).subscribe(data => {
      if (!data.state) {
        this.toastr.error(data.msj, '¡Fallo al eliminar!');
      } else {
        this.getSites();
        this.toastr.success('La sede fue eliminada correctamente', '¡Proceso exitoso!');
      }
    }, error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.getSites();
  }
}
