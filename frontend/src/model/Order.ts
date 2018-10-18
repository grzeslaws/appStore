import { ArrayField, Field } from "sparkson";
import { OrderItemSpark } from "./OrderItemSpark";

export class Order {
    constructor(
        @ArrayField("orderItems", OrderItemSpark) public orderItems: OrderItemSpark[],
        @Field("orderUuid") public orderUuid: string,
        @Field("timestamp") public timestamp: number,
    ) {}
}
