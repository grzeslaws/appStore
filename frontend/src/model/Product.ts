import { Immutable } from "immutable-typescript";
import { ArrayField, Field } from "sparkson";
import { Category } from "./Category";
import { Collection } from "./Collection";

export class Product {
    constructor(
        @Field("id") public id: number,
        @Field("product_uuid") public productUuid: string,
        @Field("name") public name: string,
        @Field("price", true) public price: number,
        @Field("quantity", true) public quantity: number,
        @Field("description", true) public description: string,
        @ArrayField("categories", Category, true) public categories?: Category[],
        @ArrayField("collections", Collection, true) public collections?: Collection[],
        @Field("image_path", true) public imagePath?: string,
    ) {}
}
