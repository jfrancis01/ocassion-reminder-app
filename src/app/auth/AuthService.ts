import { Injectable } from "@angular/core";
import { HttpClient, HttpResponseBase } from "@angular/common/http";
import { BehaviorSubject, from, Subject, tap, throwError } from "rxjs";
import { LoggedInUser } from "./LoggedInUser.model";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

export interface AuthResponseData{
    userID: string;
    email:string;
    authStatus: boolean;
    firstName:string;
    lastName:string;
}

@Injectable()
export class AuthService{

    LOGIN_URL = "http://localhost:8009/occassionsreminder/login";
    loggedInUser = new BehaviorSubject<LoggedInUser>(null);
    constructor(private http:HttpClient, private router:Router){

    }

    autoLogin(){
        const loggedInUser:LoggedInUser = JSON.parse(sessionStorage.getItem("loggedInData")!);
        if(!loggedInUser){
            this.router.navigate(['/login']);
            return;
        }
        this.loggedInUser.next(loggedInUser);
    }

    login(username:string, password:string){
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
       return this.http.get<AuthResponseData>(
            this.LOGIN_URL,
        ).pipe(catchError(errorResponse =>{
            console.log(errorResponse.error)
            return throwError(errorResponse.error)
        }),tap((responseData:AuthResponseData) =>{
            const expiresOn = new Date(new Date().getTime() + 3600 * 1000 );
            const loggedInUser = new LoggedInUser(responseData.userID, responseData.email, responseData.authStatus, expiresOn, responseData.firstName, responseData.lastName);
            this.loggedInUser.next(loggedInUser);
        }))
    }

    logout(){
        this.loggedInUser.next(null);
        sessionStorage.clear();
    }
}