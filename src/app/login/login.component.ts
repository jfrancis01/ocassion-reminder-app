import { Component, input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  error:string = null;

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
    const emial = form.value.email;
    const password = form.value.password;
    this.authService.login(emial, password).subscribe(responseData =>{
      console.log(responseData);
      console.log(responseData.userID);
      window.sessionStorage.setItem("userID", responseData.userID);
      this.router.navigate(['occassions'], {queryParams:{"userID":responseData.userID}})
    },
    error => {
      this.error = error;
      console.log(error.error.text);

    })
    form.reset();
  }
  register(){
    console.log("clicked");
    this.router.navigate(['/register']);
  }
}
