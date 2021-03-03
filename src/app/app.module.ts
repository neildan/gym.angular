/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { AuthInterceptorService } from './services/authInterceptor.service';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateCityComponent } from './components/create-city/create-city.component';
import { IndexCityComponent } from './components/index-city/index-city.component';
import { IndexSiteComponent } from './components/index-site/index-site.component';
import { CreateSiteComponent } from './components/create-site/create-site.component';
import { IndexUserComponent } from './components/index-user/index-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  /** Components */
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateCityComponent,
    IndexCityComponent,
    IndexSiteComponent,
    CreateSiteComponent,
    IndexUserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateUserComponent,
    NotFoundComponent
  ],
  /** Modules */
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule
  ],
  /** Services */
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuard,
    SecureInnerPagesGuard
  ],
  /** Main component */
  bootstrap: [AppComponent]
})
export class AppModule { }
