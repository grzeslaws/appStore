import { Field } from "sparkson";

export class Product {
    constructor(
        @Field("id") public id: number,
        @Field("product_uuid") public productUuid: string,
        @Field("name") public name: string,
        @Field("image_path", true) public imagePath?: string,
    ) {}
}
