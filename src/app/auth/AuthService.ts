import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResponseData{
    userID: string
}

@Injectable()
export class AuthService{

    LOGIN_URL = "http://localhost:8009/occassionsreminder/login";
    
    constructor(private http:HttpClient){

    }

    login(username:string, password:string){
       return this.http.post<AuthResponseData>(
            this.LOGIN_URL, {email: username, password: password}
        )
    }
}