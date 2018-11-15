import { registerNumberMapper } from "sparkson";

import { TimestampToDateString } from "./model/TimestampToDateString";

export function registerCustomMappers() {
    registerNumberMapper(TimestampToDateString, (val: number) => new TimestampToDateString(val));
}
