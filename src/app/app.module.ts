import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { OcassionsListComponent } from './ocassions/ocassions-list/ocassions-list.component';
import { OcassionsEditComponent } from './ocassions/ocassions-edit/ocassions-edit.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing';
import { DropdownDirective } from './directives/dropdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcassionsListComponent,
    OcassionsEditComponent,
    RegisterComponent,
    DropdownDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
