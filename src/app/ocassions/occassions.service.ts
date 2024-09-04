import { Subject } from "rxjs";
import { Ocassion } from "./ocassion.model";
export class OccassionsService{

    occassionsChanged = new Subject<Ocassion[]>
    private occassions: Ocassion[] = [ 
        new Ocassion(1, 'Joel Francis', 'Birthday', new Date("1985, 10, 19"), false, 'week before'),
        new Ocassion(2, 'Allie Francis', 'Graduation', new Date("1988, 7, 5"), true, 'day before'),
        new Ocassion(3, 'Joel Francis', 'Anniversary', new Date("2017, 8, 5"), false, 'day off'),
        new Ocassion(4, 'Jayce Francis', 'Confirmation', new Date("2020, 11, 23"), false, 'day off'),
        new Ocassion(5, 'Rosalie Francis', 'Wedding', new Date("2023, 04, 26"), true, 'week before')
      ];

    getSize(){
        return this.occassions.length;
    }

    getOccassions(){
        return this.occassions;
    }
    getOccassion(index: Number){
        return this.occassions[index.valueOf()];
    }

    addOccassion(occassion: Ocassion){
        this.occassions.push(occassion);
        this.occassionsChanged.next(this.occassions);
    }

    editOccassion(occassion: Ocassion, index: number){
        this.occassions[index] = occassion;
        this.occassionsChanged.next(this.occassions);
    }

    deleteOccassion(index: Number){

    }
}