export class LoggedInUser{
    
    public userID: string;
    public authStatus: string;
    public tokenExpiration:Date;

    constructor(userID:string, authStatus:string, tokenExipration:Date){

    }
}