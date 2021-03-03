import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-index-city',
  templateUrl: './index-city.component.html',
  styleUrls: ['./index-city.component.css']
})
export class IndexCityComponent implements OnInit {
  listCities: City[] = [];
  page:number = 0;

  constructor(
    private _cityService: CityService,
    private toastr: ToastrService
  ) { }

  getCities() {
    this._cityService.getCities().subscribe(data => {
      if (!data.data) {
        this.toastr.info('No se encontraron registros', 'No hay ciudades');
      } else {
        this.listCities = data.data;
      }
    }, error => {
      console.log(error)
    })
  }

  deleteCity(id: any) {
    this._cityService.deleteCity(id).subscribe(data => {
      if (!data.state) {
        this.toastr.error(data.msj, '¡Fallo al eliminar!');
      } else {
        this.getCities();
        this.toastr.success('La ciudad fue eliminada correctamente', '¡Proceso exitoso!');
      }
    }, error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.getCities();
  }
}
