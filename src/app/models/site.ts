import { City } from "./city";

export class Site {
    id?: number;
    address: string;
    cityId: number;
    city?: City;

    constructor(id:number, address: string, cityId:number){
        this.id = id;
        this.address = address;
        this.cityId = cityId;
    }
}