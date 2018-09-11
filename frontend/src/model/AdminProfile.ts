import { ArrayField, Field } from "sparkson";

export class AdminProfile {
    constructor(
        @Field("id") public id: number,
        @Field("admin_name") public adminName: string,
    ) {}
}
