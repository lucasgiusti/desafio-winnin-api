export class Order {
    id?: number;
    user_id: number;
    total: number;

    constructor(props: Order) {
        Object.assign(this, props);
    }
}
