export class Occassion{
    public occassionID: Number;
    public name: string;
    public occassionType: string;
    public occassionDate: Date;
    public reminderOn: Boolean = false;
    public offsetReminder: string
    public userID:string;

    constructor(occassionID:Number, name:string, occassionType: string, occassionDate: Date, reminderOn:boolean, offsetReminder: string){
        this.occassionID = occassionID;
        this.name = name;
        this.occassionType = occassionType;
        this.occassionDate = occassionDate;
        this.reminderOn = reminderOn;
        this.offsetReminder = offsetReminder; 
    }
}