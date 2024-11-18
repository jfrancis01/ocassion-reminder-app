import { Component, OnDestroy, OnInit } from '@angular/core';
import { Occassion } from '../ocassion.model';
import { OccassionsService } from '../occassions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-ocassions-list',
  templateUrl: './ocassions-list.component.html',
  styleUrl: './ocassions-list.component.css',
  providers:[]
})
export class OcassionsListComponent implements OnInit, OnDestroy{
  occassions: Occassion[];
  id:Number;
  userID:String;
  private occassionChangedSub : Subscription;

  constructor(private occasionsService: OccassionsService, private router: Router, private route:ActivatedRoute){

  }

  onDelete(occID: number, index: number){
    console.log(occID + " " + index);
    if(confirm("Are you sure you want to delete the occassion #" + index + "?" )){
      this.occasionsService.deleteOccassion(occID, index);
    }
  }

  onEdit(occassion: Occassion){
    this.id = occassion.occassionID; 
    console.log("Trying to route..editing...." + this.id);
    this.router.navigate(['edit'], {queryParams:{id:this.id}})
  }

  ngOnInit(): void {
      //this.userID = sessionStorage.getItem("userID");
      this.occassions = this.occasionsService.getOccassions();
      this.occassionChangedSub = this.occasionsService.occassionsChanged.subscribe(
        (occassions: Occassion[]) => {
          this.occassions = occassions;
        }
      );
  }

  ngOnDestroy(): void {
      this.occassionChangedSub.unsubscribe();
  }
}
