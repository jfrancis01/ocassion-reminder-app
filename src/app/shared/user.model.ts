export class User{
    public userID?: string;
    public userGuid?: string;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public password?: string;

    constructor(userID?: string, useGuid?: string, firstName?: string, lastName?: string, email?: string, password?: string){
        this.userGuid = useGuid;
        this.firstName = firstName;
        this.userID = userID;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}