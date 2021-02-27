import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateCityComponent } from './components/create-city/create-city.component';
import { IndexCityComponent } from './components/index-city/index-city.component';
@NgModule({
  /** Components */
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateCityComponent,
    IndexCityComponent
  ],
  /** Modules */
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  /** Services */
  providers: [],
  /** Main component */
  bootstrap: [AppComponent]
})
export class AppModule { }
