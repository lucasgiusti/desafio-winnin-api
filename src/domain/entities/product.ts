export class Product {
    id?: number;
    name: string;
    price: number;
    stock: number;

    constructor(props: Product) {
        Object.assign(this, props);
    }
}