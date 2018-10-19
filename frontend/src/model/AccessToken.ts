import { Field } from "sparkson";

export class AccessToken {
    constructor(
        @Field("access_token") public accessToken: string,
        @Field("token_type") public tokenType: string,
        @Field("refresh_token") public refreshToken: string,
        @Field("expires_in") public expiresIn: number,
        @Field("grant_type") public grantType: string,
    ) {}
}
