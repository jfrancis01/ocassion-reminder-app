import { Component, OnDestroy, OnInit } from '@angular/core';
import { Occassion } from '../ocassion.model';
import { OccassionsService } from '../occassions.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ocassions-list',
  templateUrl: './ocassions-list.component.html',
  styleUrl: './ocassions-list.component.css',
  providers:[]
})
export class OcassionsListComponent implements OnInit, OnDestroy{
  occassions: Occassion[];
  id:Number;
  private occassionChangedSub : Subscription;

  constructor(private occasionsService: OccassionsService, private router: Router){

  }

  onDelete(index: Number){
    console.log(index);
    if(confirm("Are you sure you want to delete the occassion ?" )){
      this.occasionsService.deleteOccassion(index);
    }
  }

  onEdit(occassion: Occassion){
    this.id = occassion.occassionID; 
    console.log("Trying to route..editing...." + this.id);
    this.router.navigate(['edit'], {queryParams:{id:this.id}})
  }

  ngOnInit(): void {
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
