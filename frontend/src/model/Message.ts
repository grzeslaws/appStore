import { Field } from "sparkson";

export enum MessageType {
    error, succces, warning,
}

export class Message {
    constructor(
        @Field("timestamp") public timestamp: number,
        @Field("message") public message: string,
        @Field("type") public type: MessageType,
        @Field("timeToHide", true) public timeToHide?: number,
    ) {}
}
