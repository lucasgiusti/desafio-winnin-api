export class User {
    id?: number;
    name: string;
    email: string;

    constructor(props: User) {
        Object.assign(this, props);
    }
}