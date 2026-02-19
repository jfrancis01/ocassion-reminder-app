import { Subject } from "rxjs";
import { Occassion } from "./ocassion.model";
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs-compat";
import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export class OccassionsService{
    occassionsChanged = new Subject<Occassion[]>
    private occassions: Occassion[] = [];
    private occassion: Occassion;
    E

    constructor(private http: HttpClient, private router:Router){

    }  

    getSize(){
        return this.occassions.length;
    }
    getOccassions(){
        const httpOptions = {
            params:{"userID": sessionStorage.getItem("userID")}
          }
        this.http.get<Occassion[]>(environment.OCCASSIONS_SERVICE_GET_OCCASSIONS_URL, httpOptions)
        .subscribe((occassions)=> this.setOccassions(occassions));
        return this.occassions.slice();
    }

    setOccassions(occassions: Occassion[]){
        this.occassions = occassions;
        this.occassionsChanged.next(this.occassions.slice());
    }

    setOccassion(occassion: Occassion){
        console.log(occassion);
        this.occassion = occassion;
    }

    getOccassion(index: number):Observable<Occassion>{
        this. occassion = new Occassion("", "",new Date(), false, "");
        const httpOptions = {
            params:{"occassionID": index}
          }
          return this.http.get<Occassion>(environment.OCCASSIONS_SERVICE_GET_ONE_OCCASSION_URL, httpOptions)
    }

    addOccassion(occassion: Occassion){
        this.occassions.push(occassion);
        occassion.userID = sessionStorage.getItem("userID");
        this.http.post(environment.OCCASSIONS_SERVICE_ADD_OCCASSION_URL, occassion).subscribe(responseData =>{
            console.log(responseData);
            this.occassionsChanged.next(this.occassions.slice());
            this.router.navigate(['occassions']);
          });
    }

    editOccassion(occassion: Occassion, index: number){
        occassion.userID = localStorage.getItem("userID");
        occassion.occassionID = index;
        this.occassions.push(occassion);
        this.http.put(environment.OCCASSIONS_SERVICE_EDIT_OCCASSION_URL, occassion).subscribe(responseData =>{
            console.log(responseData);
            this.occassionsChanged.next(this.occassions.slice());
            this.router.navigate(['occassions']);
        });
    }

    deleteOccassion(occassionID: number, index:number){
        this.occassions.splice(index, 1);
        const httpOptions = {
            params:{"occassionID": occassionID}
          }
        this.http.get(environment.OCCASSIONS_SERVICE_DELETE_OCCASSION_URL, httpOptions).subscribe(responseData =>{
            console.log("deleted");
            this.occassionsChanged.next(this.occassions.slice());
        });
    }
}