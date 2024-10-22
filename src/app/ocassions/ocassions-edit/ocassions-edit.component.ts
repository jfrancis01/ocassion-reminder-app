import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { OccassionsService } from '../occassions.service';
import { Occassion } from '../ocassion.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-ocassions-edit',
  templateUrl: './ocassions-edit.component.html',
  styleUrl: './ocassions-edit.component.css',
  providers:[DatePipe]
})
export class OcassionsEditComponent implements OnInit{

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
  id: number = -1;
  editMode = false;
  editOccassion: Occassion;
  occassionForm: FormGroup;

  constructor(private occasionService: OccassionsService, private router:Router, private route:ActivatedRoute, private datepipe: DatePipe){
 
  }

  ngOnInit(){
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.editMode = this.id !== 0;
    console.log("Received: " + this.id + " , editMode: " + this.editMode);
    this.populateForm(this.id);

  }
  
  private populateForm(index: number){
    let name:string = "";
    let occassionDate:Date  = new Date();
    let occassionType:string = ""
    let offset:string = ""
    let reminder:Boolean = false;
    
    this.occassionForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'occassiondate': new FormControl(this.datepipe.transform(occassionDate, 'yyyy-MM-dd'), Validators.required),
      'occassiontype': new FormControl(occassionType, Validators.required),
      'offset': new FormControl(offset, Validators.required),
      'reminder': new FormControl(reminder)
    });

    if(this.editMode && Number(this.id) > -1){
      this.occasionService.getOccassion(index).subscribe(occassion =>
        {
          this.occassionForm.patchValue({
            name: occassion.name,
            occassiondate: this.datepipe.transform(occassion.occassionDate, 'yyyy-MM-dd'),
            occassiontype: occassion.occassionType,
            offset: occassion.offsetReminder,
            reminder: occassion.reminderOn
          });
          let xsrf = getCookie("XSRF-TOKEN");
          if(xsrf){
            window.sessionStorage.setItem("xsrf", xsrf);
          }
        }
        )
    } 

  }

  onSubmit(form: NgForm){
    length = this.occasionService.getSize();
    console.log(form);
    console.log(form.value.name);
    console.log(form.value.occassiontype);
    console.log(form.value.occassiondate);
    console.log(form.value.reminder);
    console.log(form.value.offset);
    if(this.editMode){
      this.occasionService.editOccassion(new Occassion(form.value.name, form.value.occassiontype, form.value.occassiondate, form.value.reminder, form.value.offset), this.id);
    }
    else{
      this.occasionService.addOccassion(new Occassion(form.value.name, form.value.occassiontype, form.value.occassiondate, form.value.reminder, form.value.offset));
    }
    //form.reset();
    this.router.navigate(['occassions']);
  }
  onCancel(){
    this.router.navigate(['occassions']);
  }
}
