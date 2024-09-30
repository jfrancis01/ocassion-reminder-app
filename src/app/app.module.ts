import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { OcassionsListComponent } from './ocassions/ocassions-list/ocassions-list.component';
import { OcassionsEditComponent } from './ocassions/ocassions-edit/ocassions-edit.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing';
import { DropdownDirective } from './directives/dropdown.directive';
import { OccassionsService } from './ocassions/occassions.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/AuthService';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcassionsListComponent,
    OcassionsEditComponent,
    RegisterComponent,
    LoginComponent,
    DropdownDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [OccassionsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
