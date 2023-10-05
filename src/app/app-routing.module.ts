import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from 'src/guards/auth.guard';
import { SellcarComponent } from './sellcar/sellcar.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
  {path:'sellcar',component:SellcarComponent,canActivate:[authGuard]},
  {path:'',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
