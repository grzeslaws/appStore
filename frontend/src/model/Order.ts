import { ArrayField, Field } from "sparkson";
import { Customer } from "./Customer";
import { OrderItemSpark } from "./OrderItemSpark";

export class Order {
    constructor(
        @ArrayField("orderItems", OrderItemSpark) public orderItems: OrderItemSpark[],
        @Field("orderUuid") public orderUuid: string,
        @Field("linkToPayment") public linkToPayment: string,
        @Field("timestamp") public timestamp: number,
        @Field("customer") public customer: Customer,
        @Field("status", true) public status?: string,
        @Field("totalPrice", true) public totalPrice?: number,
    ) {}
}
