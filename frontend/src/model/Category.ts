import { Field } from "sparkson";

export class Category {
    constructor(
        @Field("id") public id: number,
        @Field("name") public name: string,
    ) {}
}
