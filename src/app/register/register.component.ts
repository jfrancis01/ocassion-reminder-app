import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  userData: User;
  error:string = null;
  isLoading = false;

  constructor(private router:Router, private http:HttpClient, private keyCloak:KeycloakService){

  }

  ngOnInit(): void {
      this.userData = new User("", "", "", "", "", "");
  }

  onSubmit(form: NgForm){

    this.userData.userID=""
    this.userData.firstName = form.value.firstname;
    this.userData.lastName = form.value.lastname;
    this.userData.email = form.value.email;
    this.userData.password = form.value.password;
    
    this.isLoading=true;
    
    this.http.post('http://localhost:8009/occassionsreminder/register', this.userData, {
      responseType: 'json'
    }).subscribe(responseData =>{
      
      console.log("No error");
      console.log(responseData);
      alert("Registration complete");
      this.router.navigate(['/welcome']);
      this.isLoading= false;
      form.reset();
    },
    error => {
      console.log(error.error);
     if( error.error.status = 500)
      console.log(error);
      this.isLoading= false;
    }
  );
  }

  login(){
    this.keyCloak.login();
  }
}
