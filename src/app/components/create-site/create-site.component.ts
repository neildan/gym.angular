import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { Site } from 'src/app/models/site'
import { CityService } from 'src/app/services/city.service';
import { HelperGlobalService } from 'src/app/services/helperGlobal.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit {

  siteForm: FormGroup;
  title = 'Crear Sede';
  id: string | null;
  listCities: City[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _siteService: SiteService,
    private aRouter: ActivatedRoute,
    private _helperGlobal: HelperGlobalService,
    private _cityService: CityService
  ) {
    this.siteForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(4)]],
      cityId: ['', [Validators.required, Validators.min(1)]]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  actionForm() {
    const SITE: Site = {
      address: this.siteForm.get('address')?.value,
      cityId: this.siteForm.get('cityId')?.value
    }

    // Update
    if (this.id !== null) {
      this._siteService.updateSite(this.id, SITE).subscribe(data => {
        if (this._helperGlobal.validateFormApi(data)) {
          this.toastr.success('La sede fue actualizada correctamente', '¡Proceso exitoso!');
          this.router.navigate(['/sites']);
        }
      }, error => {
        console.log(error);
        this.siteForm.reset();
      })
    } else {
      this._siteService.saveSite(SITE).subscribe(data => {
        if (this._helperGlobal.validateFormApi(data)) {
          this.toastr.success('La sede fue creada correctamente', '¡Proceso exitoso!');
          this.router.navigate(['/sites']);
        }
      }, error => {
        console.log(error);
        this.siteForm.reset();
      })
    }
  }

  isEdit() {
    if (this.id !== null) {
      this.title = 'Editar Sede';
      this._siteService.getSite(this.id).subscribe(data => {
        if (data.state && data.data) {
          let site = data.data;
          this.siteForm.setValue({
            address: site.address,
            cityId: null
          })
          this.siteForm.controls['cityId'].setValue(site.cityId);
        } else {
          this.toastr.error(data.msj, '¡Error al cargar formulario!');
        }
      })
    }
  }

  getCities() {
    this._cityService.getCities().subscribe(data => {
      if (!data.data) {
        this.siteForm.controls['cityId'].disable();
        this.toastr.error('No hay ciudades disponibles', '¡No es posible crear sede!');
      } else {
        this.listCities = data.data;
      }
    })
  }

  ngOnInit(): void {
    this.getCities();
    this.isEdit();
  }
}
