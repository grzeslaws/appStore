import { Field } from "sparkson";

// export const costs = {
//     CASH_ON_DELIVERY_COST: 5,
//     POST_NORMAL_COST: 15,
//     POST_EXPRESS_COST: 20,
// };

// export enum PaymentType {
//     CASH_ON_DELIVERY = "cashOnDelivery",
//     TRANSFER = "transfer",
// }

// export enum PostType {
//     NORMAL = "normal",
//     EXPRESS = "express",
// }

export enum PostPaymentEnum {
    POST,
    PAYMENT,
}

export class PostPayment {
    constructor(@Field("id") public id: number, @Field("name") public name: string, @Field("cost") public cost: number) {}
}
