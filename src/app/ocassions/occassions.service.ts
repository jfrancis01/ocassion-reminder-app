import { Subject } from "rxjs";
import { Occassion } from "./ocassion.model";
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class OccassionsService{

    occassionsChanged = new Subject<Occassion[]>
    private occassions: Occassion[] = [];
    private occassion: Occassion;

    constructor(private http: HttpClient){

    }  

    getSize(){
        return this.occassions.length;
    }

    getOccassions(){
        const httpOptions = {
            headers: {'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'},
            params:{"userID": "59c02271-c03e-4c99-92c1-a50fa1131b2e"}
          }
        this.http.get<Occassion[]>('http://localhost:8009/occassionsreminder/occassions',httpOptions)
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

    getOccassion(index: number){
        this. occassion = new Occassion("", "",new Date(), false, "");
        const httpOptions = {
            headers: {'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'},
            params:{"occassionID": index}
          }
          this.http.get<Occassion>('http://localhost:8009/occassionsreminder/occassion', httpOptions)
          .subscribe((occassion)=> this.setOccassion(occassion));
        return this.occassion;
    }

    addOccassion(occassion: Occassion){
        this.occassions.push(occassion);
        occassion.userID = "59c02271-c03e-4c99-92c1-a50fa1131b2e";
        this.http.post('http://localhost:8009/occassionsreminder/add', occassion).subscribe(responseData =>{
            console.log(responseData);
          });
        this.occassionsChanged.next(this.occassions);
    }

    editOccassion(occassion: Occassion, index: number){
        this.occassions[index] = occassion;
        this.occassionsChanged.next(this.occassions);
    }

    deleteOccassion(index: Number){

    }
}