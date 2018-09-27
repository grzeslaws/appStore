import { Action, ActionType } from "./action";

export const updateSuccessMessage = (message: string): Action<ActionType, string> => {
    return {
        type: "UPDATE_SUCCESS_MESSGAE",
        payload: message,
    };
};

export const updateErrorMessage = (message: string): Action<ActionType, string> => {
    return {
        type: "UPDATE_SUCCESS_MESSGAE",
        payload: message,
    };
};
