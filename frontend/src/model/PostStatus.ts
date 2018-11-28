import { Field } from "sparkson";

export enum ColorPostStatus {
    GRAY = "gray",
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
}

export class PostStatus {
    constructor(@Field("name") public name: string, @Field("color") public color: ColorPostStatus, @Field("id", true) public id?: number) {}
}
