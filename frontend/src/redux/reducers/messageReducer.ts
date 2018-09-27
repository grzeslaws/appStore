import { ImmutableUtils } from "immutable-typescript";
import { Message } from "src/model/Message";
import { Action, ActionType } from "../actions/action";
import MessageStore from "../store/messageStore";

const initialState: MessageStore = {
    messages: [],
};

export default function reducer(state = initialState, action: Action<ActionType, Message>): MessageStore {
    const messages = [...state.messages];
    switch (action.type) {
        case "UPDATE_MESSGAES":
            messages.push(action.payload);
            return ImmutableUtils.update(state).set("messages", messages);
        case "REMOVE_MESSGAE":
            const newMessages: Message[] = messages.filter((m: Message) => m.timestamp !== action.payload.timestamp);
            return ImmutableUtils.update(state).set("messages", newMessages);
    }
    return state;
}
