import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SellcarComponent } from './sellcar/sellcar.component';

//PrimeNg imports
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
//material
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    SellcarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    MatStepperModule,
    MatButtonModule,
    TagModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [MessageService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
