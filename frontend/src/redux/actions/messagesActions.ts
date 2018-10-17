import { Message } from "../../model/Message";
import { Action, ActionType } from "./action";

export const updateMessages = (message: Message): Action<ActionType, Message> => {
    return {
        type: "UPDATE_MESSGAES",
        payload: message,
    };
};

export const removeMessage = (message: Message): Action<ActionType, Message> => {
    return {
        type: "REMOVE_MESSGAE",
        payload: message,
    };
};
