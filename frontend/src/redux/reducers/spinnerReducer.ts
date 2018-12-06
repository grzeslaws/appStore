import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import SpinnerStore from "../store/spinnerStore";

const initialState: SpinnerStore = {
    spinner: 0,
};

export default function reducer(state = initialState, action: Action<ActionType, boolean>): SpinnerStore {

    let spinnerCount = state.spinner;
    action.payload ? spinnerCount += 1 : spinnerCount -= 1;
    switch (action.type) {
        case "UPDATE_SPINNER":
            return ImmutableUtils.update(state).set("spinner", spinnerCount);
    }
    return state;
}
