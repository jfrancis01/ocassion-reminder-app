import { APP_INITIALIZER,NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/AuthService';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { WelcomeComponent } from './welcome/welcome.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082/',
        realm: 'OccassionReminder-dev',
        clientId: 'occassionsreminder-angular-pkce',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/home',
      },loadUserProfileAtStartUp: false
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcassionsListComponent,
    OcassionsEditComponent,
    RegisterComponent,
    LoginComponent,
    DropdownDirective,
    LoadingSpinner,
    HomeComponent,
    UpdateComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    KeycloakAngularModule,
    
  ],
  providers: [OccassionsService, AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
