import { Error } from "../../model/Error";
import { Action } from "./action";
import { updateSpinnerAction } from "./spinnerActions";

export function requestIssuedAction(): Action<"REQUEST_ISSUED", {}> {
    return {
        type: "REQUEST_ISSUED",
    };
}

export function requestCompletedAction(): Action<"REQUEST_COMPLETED", {}> {
    return {
        type: "REQUEST_COMPLETED",
    };
}

export function requestFailedAction(message: string, err: any): Action<"REQUEST_FAILED", Error> {
    return {
        type: "REQUEST_FAILED",
        payload: new Error(message, err),
    };
}

export function requestIssued(): any {
    return dispatch => {
        dispatch(requestIssuedAction());
        dispatch(updateSpinnerAction(true));
    };
}

export function requestCompleted(): any {
    return dispatch => {
        dispatch(requestCompletedAction());
        dispatch(updateSpinnerAction(false));
    };
}

export function requestFailed(message: string, err: any): any {
    return dispatch => {
        dispatch(requestFailedAction(message, err));
    };
}
