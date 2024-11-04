import { Injectable } from "@angular/core";
import { HttpClient, HttpResponseBase } from "@angular/common/http";
import { BehaviorSubject, from, Subject, tap, throwError } from "rxjs";
import { LoggedInUser } from "./LoggedInUser.model";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { getCookie, removeCookie } from 'typescript-cookie';

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

    // autoLogin(){
    //     const loggedInUser:LoggedInUser = JSON.parse(sessionStorage.getItem("loggedInData")!);
    //     if(!loggedInUser){
    //         this.router.navigate(['/welcome']);
    //         return;
    //     }
    //     this.loggedInUser.next(loggedInUser);
    // }

    // login(username:string, password:string){
    //     sessionStorage.setItem("username", username);
    //     sessionStorage.setItem("password", password);
    //    return this.http.get<AuthResponseData>(
    //         this.LOGIN_URL, {observe:'response'}
    //     ).pipe(catchError(errorResponse =>{
    //         console.log(errorResponse.error)
    //         return throwError(errorResponse.error)
    //     }),tap((responseData) =>{
    //         const data:AuthResponseData = responseData.body;
    //         const expiresOn = new Date(new Date().getTime() + 3600 * 1000 );
    //         const loggedInUser = new LoggedInUser(data.userID, data.email, data.authStatus, expiresOn, data.firstName, data.lastName);
    //         this.loggedInUser.next(loggedInUser);
    //     }))
    // }

    logout(){
        this.loggedInUser.next(null);
        sessionStorage.clear();
        removeCookie("XSRF-TOKEN");
    }
}