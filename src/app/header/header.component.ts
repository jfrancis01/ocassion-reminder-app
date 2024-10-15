import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { AuthService } from "../auth/AuthService";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html',
    styleUrl:'./header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private loggedInSubscription: Subscription
    isAuthenticated = false;

    constructor(private authService: AuthService, private router:Router){

    }

    ngOnInit(): void {
        this.loggedInSubscription = this.authService.loggedInUser.subscribe( loggedInUser =>{
            this.isAuthenticated = !!loggedInUser;
        });
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }

    onLogOut(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}