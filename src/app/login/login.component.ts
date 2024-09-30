import { Component, input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router){

  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
  register(){
    console.log("clicked");
    this.router.navigate(['/register']);
  }
}
