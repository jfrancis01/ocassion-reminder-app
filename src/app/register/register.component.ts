import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  userData = {
    "firstname":"",
    "lastname": "",
    "email": "",
    "password":"" 
  }

  constructor(private router:Router){

  }

  onSubmit(form: NgForm){
    console.log(form);
  }

  login(){
    this.router.navigate(['/login']);
  }
}
