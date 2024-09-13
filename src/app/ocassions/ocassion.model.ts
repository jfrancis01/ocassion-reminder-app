export class Occassion{
    public occassionID: number;
    public name: String;
    public occassionType: String;
    public occassionDate: Date;
    public reminderOn: Boolean = false;
    public offsetReminder: String
    public userID:String;

    constructor(name:String, occassionType: String, occassionDate: Date, reminderOn:boolean, offsetReminder: String){
        this.name = name;
        this.occassionType = occassionType;
        this.occassionDate = occassionDate;
        this.reminderOn = reminderOn;
        this.offsetReminder = offsetReminder; 
    }
}