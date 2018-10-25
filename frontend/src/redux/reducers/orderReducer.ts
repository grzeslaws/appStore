import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import OrderStore from "../store/orderStore";

const initialState: OrderStore = {
    order: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): OrderStore {
    switch (action.type) {
        case "UPDATE_ORDER":
            return ImmutableUtils.update(state).set("order", action.payload);
    }
    switch (action.type) {
        case "UPDATE_STATUS_ORDER":
            const newState = {...state.order};
            newState.status = action.payload;
            return ImmutableUtils.update(state).set("order", newState);
    }
    switch (action.type) {
        case "UPDATE_CUSTOMER":
        const newState = {...state.order};
        newState.customer = action.payload;
        return ImmutableUtils.update(state).set("order", action.payload);
    }
    return state;
}
