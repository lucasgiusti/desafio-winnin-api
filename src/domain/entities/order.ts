import { OrderItem } from "./order-item";
import { User } from "./user";

interface OrderProps {
    id?: number;
    user_id: number;
    total: number;
    items?: OrderItem[];
    created_at?: Date;
}

export class Order {
    id?: number;
    user_id: number;
    total: number;
    items?: OrderItem[] = [];
    created_at?: Date;

    constructor(props: OrderProps) {
        Object.assign(this, props);
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
        this.recalculateTotal();
    }

    recalculateTotal(): void {
        if (this.items && this.items.length > 0) {
            this.total = this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
        }
    }
}
