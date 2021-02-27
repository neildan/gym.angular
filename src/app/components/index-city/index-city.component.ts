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

  constructor(private _cityService: CityService, private toastr: ToastrService) { }

  getCities(){
    this._cityService.getCities().subscribe(data => {
      console.log(data);
      this.listCities = data;
    }, error => {
      console.log(error)
    })
  }

  deleteCity(id: any){
    this._cityService.deleteCity(id).subscribe(data=> {
      this.toastr.success('La ciudad fue eliminada correctamente', '¡Proceso exitoso!');
      this.getCities();
    }, error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.getCities();
  }
}
