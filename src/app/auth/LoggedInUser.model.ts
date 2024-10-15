export class LoggedInUser{
    
    public userID?: string;
    public email?: string;
    public authStatus?: boolean;
    public tokenExpiration?:Date;
    public firstName?:string;
    public lastName?:string;

    constructor(userID?:string, email?:string ,authStatus?:boolean, tokenExipration?:Date, firstName?:string, lastName?:string ){
        this.userID = userID;
        this.email = email;
        this.authStatus = authStatus;
        this.tokenExpiration = tokenExipration;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}