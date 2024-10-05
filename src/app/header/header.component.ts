import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { AuthService } from "../auth/AuthService";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html',
    styleUrl:'./header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private loggedInSubscription: Subscription
    isAuthenticated = false;

    constructor(private authService: AuthService){

    }

    ngOnInit(): void {
        this.loggedInSubscription = this.authService.loggedInUser.subscribe( loggedInUser =>{
            if(!!loggedInUser){
                this.isAuthenticated = loggedInUser.authStatus;
            }
            else{
                console.log("Error in Authentication");
            }
        });
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }
}