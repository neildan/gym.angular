import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './components/app/app-routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
  /** Components */
  declarations: [
    AppComponent
  ],
  /** Modules */
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  /** Services */
  providers: [],
  /** Main component */
  bootstrap: [AppComponent]
})
export class AppModule { }
