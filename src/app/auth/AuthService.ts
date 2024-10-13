import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from, Subject, tap, throwError } from "rxjs";
import { LoggedInUser } from "./LoggedInUser.model";
import { catchError } from "rxjs/operators";

export interface AuthResponseData{
    userID: string;
    email:string;
    authStatus: boolean;
}

@Injectable()
export class AuthService{

    LOGIN_URL = "http://localhost:8009/occassionsreminder/login";
    loggedInUser = new BehaviorSubject<LoggedInUser>(null);
    constructor(private http:HttpClient){

    }

    login(username:string, password:string){
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
     //   let headers = new Headers();
    //    headers.append("Authorization", "Basic " + btoa(username + ":" + password));  
     //   const httpOptions = {
     //       headers: {'Authorization': 'Basic ' + window.btoa(username + ':' + password)}
      //    }
       return this.http.get<AuthResponseData>(
            this.LOGIN_URL,
        ).pipe(catchError(errorResponse =>{
            console.log(errorResponse.error)
            return throwError(errorResponse.error)
        }),tap((responseData:AuthResponseData) =>{
            const expiresOn = new Date(new Date().getTime() + 3600 * 1000 );
            const loggedInUser = new LoggedInUser(responseData.userID, responseData.email, responseData.authStatus, expiresOn);
            this.loggedInUser.next(loggedInUser);
        }))
    }
}