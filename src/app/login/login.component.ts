import { Component, input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from '../auth/AuthService';
import { Observable } from 'rxjs';
import { getCookie } from 'typescript-cookie';
import { LoggedInUser } from '../auth/LoggedInUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  error:string = null;
  isLoading:boolean = false

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    const emial = form.value.email;
    const password = form.value.password;
    let authObs:Observable<AuthResponseData | any>
    this.isLoading = true;
    authObs = this.authService.login(emial, password)
    authObs.subscribe({
      next: (responseData) =>{
        sessionStorage.setItem("Authorization", responseData.headers.get("Authorization"))
        sessionStorage.setItem("userID", responseData.body.userID);
        sessionStorage.setItem("loggedInData", JSON.stringify(responseData.body));
        let xsrf = getCookie("XSRF-TOKEN")!;
        window.sessionStorage.setItem("xsrf", xsrf);
        this.router.navigate(['home'], {queryParams:{"userID":responseData.body.userID}})
      },
      error: (error) =>{
        this.error = error;
        this.isLoading = false;
      }
    })
    form.reset();
  }
  register(){
    this.router.navigate(['/register']);
  }
}
