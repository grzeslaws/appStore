import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import SpinnerStore from "../store/spinnerStore";

const initialState: SpinnerStore = {
    spinner: false,
};

export default function reducer(state = initialState, action: Action<ActionType, boolean>): SpinnerStore {
    switch (action.type) {
        case "UPDATE_SPINNER":
            return ImmutableUtils.update(state).set("spinner", action.payload);
    }
    return state;
}
