import { Error } from "../../model/Error";
import { Action } from "./action";

export function requestIssued(): Action<"REQUEST_ISSUED", {}> {
    return {
        type: "REQUEST_ISSUED",
    };
}

export function requestCompleted(): Action<"REQUEST_COMPLETED", {}> {
    return {
        type: "REQUEST_COMPLETED",
    };
}
export function requestFailed(message: string, err: any): Action<"REQUEST_FAILED", Error> {
    return {
        type: "REQUEST_FAILED",
        payload: new Error(message, err),
    };
}
