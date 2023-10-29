export default class Client{
    id;
    phonenumber;
    email;
    username;
    lastVisitDate;

    constructor(id, phonenumber, email, username, lastVisitDate) {
        this.id = id;
        this.phonenumber = phonenumber;
        this.email = email;
        this.username = username;
        this.lastVisitDate = lastVisitDate;
    }

    static from(json){
        return Object.assign(new Client(), json);
    }
}