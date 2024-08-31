import { Component, OnInit } from '@angular/core';
import { Ocassion } from '../ocassion.model';
import { OccassionsService } from '../occassions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ocassions-list',
  templateUrl: './ocassions-list.component.html',
  styleUrl: './ocassions-list.component.css',
  providers:[OccassionsService]
})
export class OcassionsListComponent implements OnInit{
  occassions: Ocassion[] =[];
  id:Number;

  constructor(private occasionsService: OccassionsService, private router: Router){

  }

  onDelete(index: Number){
    console.log(index);
    if(confirm("Are you sure you want to delete the occassion ?" )){
      this.occasionsService.deleteOccassion(index);
    }
  }

  onEdit(occassion: Ocassion){
    this.id = occassion.occassionID; 
    console.log("Trying to route..editing...." + this.id);
    this.router.navigate(['edit'], {queryParams:{id:this.id}})
  }

  ngOnInit(): void {
      this.occassions = this.occasionsService.getOccassions();
  }

}
