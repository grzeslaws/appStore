import { ArrayField } from "sparkson";
import { PostPayment } from "./PostPayment";

export class PostPaymentGroup {
    constructor(
        @ArrayField("payment_types", PostPayment) public paymentTypes: PostPayment[],
        @ArrayField("post_types", PostPayment) public postTypes: PostPayment[],
    ) {}
}
