import { Site } from "./site";

export class User {
    id?: number;
    name: string;
    lastname: string;
    admin?: boolean;
    email: string;
    password: string;
    siteId?: number;
    site?: Site;

    constructor(
        id: number,
        name: string,
        lastname: string,
        admin: boolean,
        email: string,
        password: string,
        siteId: number
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.admin = admin;
        this.email = email;
        this.password = password;
        this.siteId = siteId;
    }
}