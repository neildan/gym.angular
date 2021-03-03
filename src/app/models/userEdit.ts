export class UserEdit {
    name?: string;
    lastname?: string;
    admin?: boolean;
    email?: string;
    password?: string;
    siteId?: number;

    constructor(
        name: string,
        lastname: string,
        admin: boolean,
        email: string,
        password: string,
        siteId: number
    ) {
        this.name = name;
        this.lastname = lastname;
        this.admin = admin;
        this.email = email;
        this.password = password;
        this.siteId = siteId;
    }
}