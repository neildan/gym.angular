import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateCityComponent } from './components/create-city/create-city.component';
import { CreateSiteComponent } from './components/create-site/create-site.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HomeComponent } from './components/home/home.component';
import { IndexCityComponent } from './components/index-city/index-city.component';
import { IndexSiteComponent } from './components/index-site/index-site.component';
import { IndexUserComponent } from './components/index-user/index-user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'users', component: IndexUserComponent, canActivate: [AuthGuard]},
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard]},
  { path: 'edit-user/:id', component: CreateUserComponent, canActivate: [AuthGuard]},
  { path: 'cities', component: IndexCityComponent, canActivate: [AuthGuard]},
  { path: 'create-city', component: CreateCityComponent, canActivate: [AuthGuard]},
  { path: 'edit-city/:id', component: CreateCityComponent, canActivate: [AuthGuard]},
  { path: 'sites', component: IndexSiteComponent, canActivate: [AuthGuard]},
  { path: 'create-site', component: CreateSiteComponent, canActivate: [AuthGuard]},
  { path: 'edit-site/:id', component: CreateSiteComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
