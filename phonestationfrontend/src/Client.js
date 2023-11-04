import {parse} from "date-fns";
import {enGB, enUS} from "date-fns/locale";

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

    static from(json) {
        const dateFormat = "dd-MMM-yyyy HH:mm:ss";
        const parsedDate = parse(json.lastVisitDate, dateFormat, new Date(), {
            locale: enGB
        });

        return new Client(json.id, json.phonenumber, json.email, json.username, parsedDate);
    }
}