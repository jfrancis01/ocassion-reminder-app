export class LoggedInUser{
    
    public userID?: string;
    public email?: string;
    public authStatus?: boolean;
    public tokenExpiration?:Date;

    constructor(userID?:string, email?:string ,authStatus?:boolean, tokenExipration?:Date){
        this.userID = userID;
        this.email = email;
        this.authStatus = authStatus;
        this.tokenExpiration = tokenExipration;
    }
}