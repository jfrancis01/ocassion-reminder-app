import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { OccassionsService } from '../occassions.service';
import { Ocassion } from '../ocassion.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ocassions-edit',
  templateUrl: './ocassions-edit.component.html',
  styleUrl: './ocassions-edit.component.css',
  providers:[DatePipe]
})
export class OcassionsEditComponent {

  occassiontypes = ['Birthday', 'Anniversary', 'Graduation', 'Confirmation', 'Wedding'];
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

  constructor(private occasionService: OccassionsService, private router:Router, private route:ActivatedRoute, private datepipe: DatePipe){
 
  }

  ngOnInit(){
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.id = Number(this.id) - Number(1);
    this.editMode = this.id !== -1;
    console.log("Received: " + this.id + " , editMode: " + this.editMode);
    this.populateForm(this.id);

  }
  
  private populateForm(index: Number){
    let name:string = "";
    let occassionDate:Date  = new Date();
    let occassionType:string = ""
    let offset:string = ""
    let reminder:Boolean = false;
    if(this.editMode && Number(this.id) > -1){
      this.editOccassion = this.occasionService.getOccassion(index);
      this.occasionTypeIndex = this.occassionMap.get(this.editOccassion.occassionType.toString());
      console.log(this.occasionTypeIndex);
      this.reminderOffsetIndex = this.offsetMap.get(this.editOccassion.offsetReminder.toString());
      console.log(this.reminderOffsetIndex);
      name = this.editOccassion.name
      occassionDate = this.editOccassion.occassionDate;
      occassionType = this.editOccassion.occassionType;
      offset = this.editOccassion.offsetReminder;
      reminder = this.editOccassion.reminderOn;
    } 
    this.occassionForm = new FormGroup({
      'name': new FormControl(name),
      'occassiondate': new FormControl(this.datepipe.transform(occassionDate, 'yyyy-MM-dd')),
      'occassiontype': new FormControl(occassionType),
      'offset': new FormControl(offset),
      'reminder': new FormControl(reminder)
    });
  }

  onSubmit(form: NgForm){
    length = this.occasionService.getSize();
    console.log(form);
    console.log(form.value.name);
    if(this.editMode){
      this.editOccassion.name = form.value.name;
      this.editOccassion.occassionDate = form.value.occassiondate;
      this.editOccassion.occassionType = form.value.occassiontype;
      this.editOccassion.offsetReminder = form.value.offset;
      this.editOccassion.reminderOn = form.value.reminder;
      this.occasionService.editOccassion
    }
    else{
      this.occasionService.addOccassion(new Ocassion(length + 1, form.value.name, form.value.occassiontype, form.value.occassiondate, form.value.reminder, form.value.offset));
    }

    this.router.navigate(['occassions']);
  }
  onCancel(){
    this.router.navigate(['occassions']);
  }
}