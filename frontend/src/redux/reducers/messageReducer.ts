import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import MessageStore from "../store/messageStore";

const initialState: MessageStore = {
    successMessage: null,
    errorMessage: null,
};

export default function reducer(state = initialState, action: Action<ActionType, string>): MessageStore {
    switch (action.type) {
        case "UPDATE_SUCCESS_MESSGAE":
            return ImmutableUtils.update(state).set("successMessage", action.payload);
        case "UPDATE_ERROR_MESSAGE":
            return ImmutableUtils.update(state).set("errorMessage", action.payload);
    }
    return state;
}
