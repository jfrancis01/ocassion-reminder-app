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
       return this.http.post<AuthResponseData>(
            this.LOGIN_URL, {email: username, password: password},
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