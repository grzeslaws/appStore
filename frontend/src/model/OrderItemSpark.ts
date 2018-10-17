import { Field } from "sparkson";
import { Product } from "./Product";

export class OrderItemSpark {
    constructor(@Field("product") public product: Product, @Field("quantity") public quantity: number) {}
}
