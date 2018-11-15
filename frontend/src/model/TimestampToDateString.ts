import { Registrable } from "sparkson";

@Registrable
export class TimestampToDateString {
    public millisec: number;

    constructor(public milliseconds: number) {
        this.millisec = milliseconds;
    }

    public get dateString() {
        const date = new Date(this.millisec * 1000);
        return date.toLocaleString();
    }
}
