import { Subject } from "rxjs";
import { Occassion } from "./ocassion.model";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class OccassionsService{

    occassionsChanged = new Subject<Occassion[]>
    private occassions: Occassion[] = [ 
        new Occassion(1, 'Joel Francis', 'Birthday', new Date("1985, 10, 19"), false, 'week before'),
        new Occassion(2, 'Allie Francis', 'Graduation', new Date("1988, 7, 5"), true, 'day before'),
        new Occassion(3, 'Joel Francis', 'Anniversary', new Date("2017, 8, 5"), false, 'day off'),
        new Occassion(4, 'Jayce Francis', 'Confirmation', new Date("2020, 11, 23"), false, 'day off'),
        new Occassion(5, 'Rosalie Francis', 'Wedding', new Date("2023, 04, 26"), true, 'week before')
      ];

    constructor(private http: HttpClient){

    }  

    getSize(){
        return this.occassions.length;
    }

    getOccassions(){
        return this.occassions;
    }
    getOccassion(index: Number){
        return this.occassions[index.valueOf()];
    }

    addOccassion(occassion: Occassion){
        this.occassions.push(occassion);
        occassion.userID = "7bc295c0-f1b1-48ec-a667-f4fd7e785c10";
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