import { Immutable } from "immutable-typescript";
import { Field } from "sparkson";
import { Category } from "./Category";

export class Product {
    constructor(
        @Field("id") public id: number,
        @Field("product_uuid") public productUuid: string,
        @Field("name") public name: string,
        @Field("price", true) public price: number,
        @Field("quantity", true) public quantity: number,
        @Field("image_path", true) public imagePath?: string,
        @Field("categories", true) public categories?: Category[],
    ) {}
}
