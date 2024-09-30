import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  userData: User;
  error:string = null;

  constructor(private router:Router, private http:HttpClient){

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
     
    this.http.post('http://localhost:8009/occassionsreminder/register', this.userData, {
      responseType: 'json'
    }).subscribe(responseData =>{
      
      console.log("No error");
      console.log(responseData);
      this.router.navigate(['/login']);
      form.reset();
    },
    error => {
      this.error = error.error;
      console.log(error);
    }
  );
  }

  login(){
    this.router.navigate(['/login']);
  }
}
