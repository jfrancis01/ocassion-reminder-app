import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OcassionsListComponent } from "./ocassions/ocassions-list/ocassions-list.component";
import { OcassionsEditComponent } from "./ocassions/ocassions-edit/ocassions-edit.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes =[
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    {path:'login', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'occassions', component: OcassionsListComponent},
    {path:'add', component:OcassionsEditComponent},
    {path:'edit', component:OcassionsEditComponent},
    {path:'register', component: RegisterComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}