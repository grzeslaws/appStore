import { Action } from "./action";

export function updateSpinnerAction(show): Action<"UPDATE_SPINNER", boolean> {
    return {
        type: "UPDATE_SPINNER",
        payload: show,
    };
}
