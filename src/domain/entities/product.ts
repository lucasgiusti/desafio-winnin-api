export class Product {
    id?: number;
    name: string;
    price: number;
    stock: number;
    created_at?: Date;

    constructor(props: Product) {
        Object.assign(this, props);
    }
}