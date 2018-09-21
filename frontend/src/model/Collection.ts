import { Field } from "sparkson";

export class Collection {
    constructor(
        @Field("id") public id: number,
        @Field("name") public name: string,
    ) {}
}
