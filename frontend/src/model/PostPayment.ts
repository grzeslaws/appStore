import { Field } from "sparkson";

export enum PostPaymentEnum {
    POST,
    PAYMENT,
}

export class PostPayment {
    constructor(@Field("id") public id: number, @Field("name") public name: string, @Field("cost") public cost: number) {}
}
