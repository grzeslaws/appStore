import { Immutable, ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";

import { ModalContent } from "../../model/ModalContent";
import ModalStore from "../store/ModalStore";

const initialState: ModalStore = {
    modal: null,
    submit: false,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): ModalStore {
    switch (action.type) {
        case "UPDATE_MODAL":
            return ImmutableUtils.update(state).set("modal", action.payload);
        case "REMOVE_MODAL":
            return ImmutableUtils.update(state).set("modal", null);
        case "UPDATE_SUBMIT":
            return ImmutableUtils.update(state).set("submit", action.payload);
    }
    return state;
}
