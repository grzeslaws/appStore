import { ArrayField, Field } from "sparkson";
import { Customer } from "./Customer";
import { OrderItemSpark } from "./OrderItemSpark";
import { PostStatus } from "./PostStatus";
import { TimestampToDateString } from "./TimestampToDateString";

export class Order {
    constructor(
        @ArrayField("orderItems", OrderItemSpark) public orderItems: OrderItemSpark[],
        @Field("orderUuid") public orderUuid: string,
        @Field("timestamp") public timestamp: TimestampToDateString,
        @Field("customer", true) public customer?: Customer,
        @Field("status", true) public status?: string,
        @Field("totalPrice", true) public totalPrice?: number,
        @Field("linkToPayment", true) public linkToPayment?: string,
        @Field("post_status", true) public postStatus?: PostStatus,
    ) {}
}
