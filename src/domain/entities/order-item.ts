import { Product } from "./product";

interface OrderItemProps {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
}

export class OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;

    constructor(props: OrderItemProps) {
        Object.assign(this, props);
    }

    getSubtotal(): number {
        return this.price * this.quantity;
    }
}
