import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../auth/LoggedInUser.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  fname:string = "John";
  lname:string = "Doe";
  ngOnInit(): void {
    const loggedInUser:LoggedInUser = JSON.parse(sessionStorage.getItem("loggedInData")!);
    if(loggedInUser){
        this.fname = loggedInUser.firstName;
        this.lname = loggedInUser.lastName;
    }
  }
}
