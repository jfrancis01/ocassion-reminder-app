import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { AuthService } from "../auth/AuthService";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { LoggedInUser } from "../auth/LoggedInUser.model";
import { KeycloakProfile } from "keycloak-js";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html',
    styleUrl:'./header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

    //private loggedInSubscription: Subscription

    loggedInUser = new LoggedInUser();
    isAuthenticated = false;
    public userProfile: KeycloakProfile | null = null;

    constructor(private authService: AuthService, private router:Router, private keyCloak:KeycloakService){

    }

    public async ngOnInit(){
        this.isAuthenticated = await this.keyCloak.isLoggedIn();
        if(this.isAuthenticated){
            this.userProfile = await this.keyCloak.loadUserProfile();
            this.loggedInUser.authStatus = true;
            this.loggedInUser.firstName = this.userProfile.firstName;
            this.loggedInUser.lastName = this.userProfile.lastName;
            this.loggedInUser.email = this.userProfile.email;
            sessionStorage.setItem("loggedInData", JSON.stringify(this.loggedInUser));
        }
        //this.loggedInSubscription = this.authService.loggedInUser.subscribe( loggedInUser =>{
        //    this.isAuthenticated = !!loggedInUser;
       // });
    }

    ngOnDestroy(): void {
        //this.loggedInSubscription.unsubscribe();
    }

    login(){
        this.keyCloak.login();
    }

    onLogOut(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}