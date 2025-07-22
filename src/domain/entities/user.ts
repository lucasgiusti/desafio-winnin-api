import { Order } from "./order";

export class User {
    id?: number;
    name: string;
    email: string;
    created_at?: Date;
    

    constructor(props: User) {
        Object.assign(this, props);
    }
}