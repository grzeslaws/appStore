import { ArrayField } from "sparkson";
import { Collection } from "./Collection";

export class Collections {
    constructor(
        @ArrayField("collections", Collection) public collections: Collection[],
    ) {}
}
