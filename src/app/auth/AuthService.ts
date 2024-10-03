import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, from, Subject, tap, throwError } from "rxjs";
import { LoggedInUser } from "./LoggedInUser.model";

export interface AuthResponseData{
    userID: string;
    authStatus: string;
}

@Injectable()
export class AuthService{

    LOGIN_URL = "http://localhost:8009/occassionsreminder/login";
    loggedInUser = new Subject<LoggedInUser>();
    constructor(private http:HttpClient){

    }

    login(username:string, password:string){ 
       return this.http.post<AuthResponseData>(
            this.LOGIN_URL, {email: username, password: password}
        ).pipe(catchError(errorResponse =>{
            console.log(errorResponse.error)
            return throwError(errorResponse.error)
        }))
    }
}