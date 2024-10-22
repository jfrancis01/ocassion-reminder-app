import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  
  userData: User;
  error:string = null;
  isLoading = false;

  constructor(private router:Router, private http:HttpClient){

  }

  ngOnInit(): void {
    this.userData = new User("","","", "", "");
    const httpOptions = {
      params:{"userID": sessionStorage.getItem("userID")}
    }
    this.http.get<User>('http://localhost:8009/occassionsreminder/getUser', httpOptions).subscribe({
      next: (response) =>  {
        if(!!response){
          this.userData=response;
          let xsrf = getCookie("XSRF-TOKEN");
          if(xsrf){
            window.sessionStorage.setItem("xsrf", xsrf);
          }
        }
      },
      error: (error) =>{
        console.log(error);
        this.error = error.error;
      }
    });
  }

  onSubmit(form:NgForm){
    console.log(form);
    const user =new User(this.userData.userID, null,form.value.firstname, form.value.lastname, form.value.email,null )
    this.http.put('http://localhost:8009/occassionsreminder/editUser', user ).subscribe({
      next: (response) =>  {
        if(!!response){
          alert("Successfully Updated");
        }
      },
      error: (error) =>{
        console.log(error);
        this.error = error.error;
      }
    })
  }

  onCancel(){
    this.router.navigate(['/home'])
  }
}
