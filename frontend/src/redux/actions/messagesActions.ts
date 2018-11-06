import { Message } from "../../model/Message";
import { Action, ActionType } from "./action";

export const updateMessages = (message: Message): Action<ActionType, Message> => {
    const messageData: Message = {
        message: message.message,
        type: message.type,
        timestamp: Date.now(),
        timeToHide: message.timeToHide,
    };

    return {
        type: "UPDATE_MESSGAES",
        payload: messageData,
    };
};

export const removeMessage = (message: Message): Action<ActionType, Message> => {
    return {
        type: "REMOVE_MESSGAE",
        payload: message,
    };
};
