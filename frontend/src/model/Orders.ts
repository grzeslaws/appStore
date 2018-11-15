import { ArrayField, Field } from "sparkson";
import { Order } from "./Order";

export class Orders {
    constructor(
        @ArrayField("orders", Order) public orders: Order[],
        @Field("has_next", true) public hasNext?: boolean,
        @Field("has_prev", true) public hasPrev?: boolean,
        @Field("next_num", true) public nextNum?: number,
        @Field("prev_num", true) public prevNum?: number,
        @Field("pages", true) public pages?: number,
    ) {}
}
