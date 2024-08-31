import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { OccassionsService } from '../occassions.service';
import { Ocassion } from '../ocassion.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-ocassions-edit',
  templateUrl: './ocassions-edit.component.html',
  styleUrl: './ocassions-edit.component.css',
  providers:[OccassionsService]
})
export class OcassionsEditComponent {

  occassiontypes = ['BirthDay', 'Anniversary', 'Graduation', 'Confirmation', 'Wedding'];
  offsets = ['week before', 'day before', 'day off'];
  occassionMap = new Map<string, number>([
    ["Birthday", 0],
    ["Anniversary", 1],
    ["Graduation", 2],
    ["Confirmation", 3],
    ["Wedding", 4]
  ]);
  offsetMap = new Map<string, number>([
    ["week before", 0],
    ["day before", 1],
    ["day off", 2]
  ]);
  id: Number;
  editMode = false;
  editOccassion: Ocassion;
  occassionForm: FormGroup;
  occasionTypeIndex = -1;
  reminderOffsetIndex = -1;

  constructor(private occasionService: OccassionsService, private router:Router, private route:ActivatedRoute){
 
  }

  ngOnInit(){
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.editMode = this.id !== 0;
    console.log("Received: " + this.id + " , editMode: " + this.editMode);
    if(this.editMode){
      this.populateForm(this.id);
    }
    else{
      this.editOccassion = new Ocassion(-1, "", "", new Date(), true, "");
    }
  }
  
  private populateForm(index: Number){
    this.editOccassion = this.occasionService.getOccassion(index);
    this.occasionTypeIndex = this.occassionMap.get(this.editOccassion.occassionType.toString());
    console.log(this.occasionTypeIndex);
    this.reminderOffsetIndex = this.offsetMap.get(this.editOccassion.offsetReminder.toString());
    console.log(this.reminderOffsetIndex);
  }

  onSubmit(form: NgForm){
    console.log(form);
    let id:number = -1;
    let name:string = form.value.name;
    let occassionDate:Date  = form.value.occassiondate;
    let occassiontype:string= form.value.occassiontype;
    let offset:string = form.value.offset;
    let reminder:boolean = form.value.reminder;
    let occassion:Ocassion = new Ocassion(id, name, occassiontype, occassionDate, reminder, offset);
    this.occasionService.addOccassion(occassion);
  }
  onCancel(){
    this.router.navigate(['occassions']);
  }
}
