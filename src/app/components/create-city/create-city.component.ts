import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {

  cityForm: FormGroup;
  title = 'Crear Ciudad';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _cityService: CityService,
    private aRouter: ActivatedRoute
  ) {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  addCity() {
    const CITY: City = {
      name: this.cityForm.get('name')?.value
    }
    console.log(CITY);

    // Update
    if(this.id !== null){
      this._cityService.updateCity(this.id, CITY).subscribe(data => {
        this.toastr.success('La ciudad fue actualizada correctamente', '¡Proceso exitoso!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.cityForm.reset();
      })
    // Create
    } else {
      this._cityService.saveCity(CITY).subscribe(data => {
        this.toastr.success('La ciudad fue creada correctamente', '¡Proceso exitoso!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.cityForm.reset();
      })
    }
  }

  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Ciudad';
      this._cityService.getCity(this.id).subscribe(data => {
        this.cityForm.setValue({
          name: data.name
        })
      })
    }
  }

  ngOnInit(): void {
    this.isEdit();
  }

}
