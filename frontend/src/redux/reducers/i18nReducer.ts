import {ImmutableUtils} from "immutable-typescript";
import I18NStore from "../store/i18nStore";

import { en } from "../../i18n/en";
import {Action, ActionType} from "../actions/action";

const initialState: I18NStore = {
    messages: en,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): I18NStore {
    switch (action.type) {
        case "SET_I18N":
            return ImmutableUtils.update(state).set("messages", action.payload);
    }
    return state;
}
