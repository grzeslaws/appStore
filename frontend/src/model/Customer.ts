import { Field } from "sparkson";

export class Customer {
    constructor(
        @Field("first_name") public firstName: string,
        @Field("last_name") public lastName: string,
        @Field("email") public email: string,
        @Field("street") public street: string,
        @Field("city") public city: string,
        @Field("zip_code") public zipCode: string,
        @Field("telephone") public telephone: string,
        @Field("customer_uuid", true) public customerUuid?: string,
    ) {}
}
