export default class Service{
    id;
    price;
    name;
    description;
    isTariff;
    isDeleted;

    constructor(id, price, name, description, isTariff, isDeleted) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
        this.isTariff = isTariff;
        this.isDeleted = isDeleted;
    }

    static from(json){
        return Object.assign(new Service(), json);
    }
}