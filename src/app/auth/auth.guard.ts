import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./AuthService";
import {map} from 'rxjs/operators'
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean|UrlTree|Promise<boolean|UrlTree>|Observable<boolean|UrlTree> {
        return this.authService.loggedInUser.pipe(map(user =>{
            const isAuth =!!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));
    }
} 