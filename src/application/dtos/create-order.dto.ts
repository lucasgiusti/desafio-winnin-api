export class CreateOrderItemDto {
    product_id: number;
    quantity: number;
}

export class CreateOrderDto {
    user_id: number;
    items: CreateOrderItemDto[];
}
