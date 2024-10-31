import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { LoggedInUser } from './LoggedInUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthKeyClockGuard extends KeycloakAuthGuard {
  user = new LoggedInUser();
  public userProfile: KeycloakProfile | null = null;
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }else{
        this.userProfile = await this.keycloak.loadUserProfile();
        this.user.authStatus = true;
        this.user.firstName = this.userProfile.firstName || "";
        this.user.lastName = this.userProfile.lastName || "";
        this.user.email = this.userProfile.email || "";
        window.sessionStorage.setItem("loggedInData",JSON.stringify(this.user));
        window.sessionStorage.setItem("userID", this.userProfile.id);
        return true;
    }
  }
}