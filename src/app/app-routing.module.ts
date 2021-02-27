import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCityComponent } from './components/create-city/create-city.component';
import { IndexCityComponent } from './components/index-city/index-city.component';

const routes: Routes = [
  { path: '', component: IndexCityComponent},
  { path: 'create-city', component: CreateCityComponent},
  { path: 'edit-city/:id', component: CreateCityComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
