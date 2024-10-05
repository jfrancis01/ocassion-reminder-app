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
    console.log(form);
    const emial = form.value.email;
    const password = form.value.password;
    let authObs:Observable<AuthResponseData | any>
    this.isLoading = true;
    authObs = this.authService.login(emial, password)
    authObs.subscribe((responseData:AuthResponseData) =>{
      console.log(responseData);
      console.log(responseData.userID);
      window.sessionStorage.setItem("userID", responseData.userID);
      window.sessionStorage.setItem("loggeInData", JSON.stringify(LoggedInUser));
      let xsrf = getCookie("XRSF-TOKEN")!;
      window.sessionStorage.setItem("xsrf", xsrf);
      this.router.navigate(['occassions'], {queryParams:{"userID":responseData.userID}})
    },
    error => {
      this.error = error;
      this.isLoading = false;

    })
    form.reset();
  }
  register(){
    console.log("clicked");
    this.router.navigate(['/register']);
  }
}
