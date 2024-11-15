import { Subject } from "rxjs";
import { Occassion } from "./ocassion.model";
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs-compat";

@Injectable({providedIn:'root'})
export class OccassionsService{
    occassionsChanged = new Subject<Occassion[]>
    private occassions: Occassion[] = [];
    private occassion: Occassion;

    constructor(private http: HttpClient, private router:Router){

    }  

    getSize(){
        return this.occassions.length;
    }
    getOccassions(){
        const httpOptions = {
            params:{"userID": sessionStorage.getItem("userID")}
          }
        this.http.get<Occassion[]>('http://localhost:8009/occassionsreminder/occassions', httpOptions)
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
          return this.http.get<Occassion>('http://localhost:8009/occassionsreminder/occassion', httpOptions)
    }

    addOccassion(occassion: Occassion){
        this.occassions.push(occassion);
        occassion.userID = sessionStorage.getItem("userID");
        this.http.post('http://localhost:8009/occassionsreminder/add', occassion).subscribe(responseData =>{
            console.log(responseData);
            this.occassionsChanged.next(this.occassions.slice());
            this.router.navigate(['occassions']);
          });
    }

    editOccassion(occassion: Occassion, index: number){
        occassion.userID = localStorage.getItem("userID");
        occassion.occassionID = index;
        //this.occassions[index] = occassion;
        this.occassions.push(occassion);
        this.http.put('http://localhost:8009/occassionsreminder/edit', occassion).subscribe(responseData =>{
            console.log(responseData);
            this.occassionsChanged.next(this.occassions.slice());
            this.router.navigate(['occassions']);
        });
    }

    deleteOccassion(index: Number){

    }
}