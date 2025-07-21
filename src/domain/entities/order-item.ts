import { Product } from "./product";

export class OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;

    constructor(props: OrderItem) {
        Object.assign(this, props);
    }
}
