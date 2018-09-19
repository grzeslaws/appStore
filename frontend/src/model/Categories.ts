import { ArrayField } from "sparkson";
import { Category } from "./Category";

export class Categories {
    constructor(
        @ArrayField("categories", Category) public categories: Category[],
    ) {}
}
