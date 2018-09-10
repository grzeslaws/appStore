import { ArrayField, Field } from "sparkson";
import { Product } from "./Product";

export class Products {
    constructor(
        @ArrayField("products", Product) public products: Product[],
        @Field("has_next") public hasNext: boolean,
        @Field("has_prev") public hasPrev: boolean,
        @Field("next_num") public nextNum: number,
        @Field("prev_num") public prevNum: number,
        @Field("pages") public pages: number,
    ) {}
}
