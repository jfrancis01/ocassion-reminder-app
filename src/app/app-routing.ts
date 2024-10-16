import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OcassionsListComponent } from "./ocassions/ocassions-list/ocassions-list.component";
import { OcassionsEditComponent } from "./ocassions/ocassions-edit/ocassions-edit.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { UpdateComponent } from "./update/update.component";

const appRoutes: Routes =[
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    {path:'login', component: LoginComponent},
    {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
    {path:'occassions', component: OcassionsListComponent},
    {path:'add', component:OcassionsEditComponent},
    {path:'edit', component:OcassionsEditComponent},
    {path:'editUser', component:UpdateComponent},
    {path:'register', component: RegisterComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}