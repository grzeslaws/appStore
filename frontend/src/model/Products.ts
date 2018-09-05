import { ArrayField, Field } from "sparkson";
import { Product } from "./Product";

export class Products {
    constructor(
        @ArrayField("products", Product) public products: Product[],
    ) {}
}
