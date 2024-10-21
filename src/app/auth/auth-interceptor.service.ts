import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { getCookie } from "typescript-cookie";
import { LoggedInUser } from "./LoggedInUser.model";
import {tap} from 'rxjs'

//test check into JWT stream

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    user = new LoggedInUser();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let httpHeaders = new HttpHeaders();
        if(req.url === "http://localhost:8009/occassionsreminder/login" ){
            httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(sessionStorage.getItem("username")+ ':' + sessionStorage.getItem("password")));
        }
        else{
            let authorization = sessionStorage.getItem("Authorization");
            if(authorization){
                httpHeaders = httpHeaders.append('Authorization', authorization);
            }
        }
        let xsrf = sessionStorage.getItem('xsrf');
        if(xsrf){
          httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);
        }
        httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
        const xhr = req.clone({
          headers: httpHeaders,
          withCredentials:true
        });

        return next.handle(xhr).pipe(tap((err:any) =>{
            if(err instanceof HttpErrorResponse){
                if(err.status !== 401){
                    return;
                }
            }
        }));
    }
}