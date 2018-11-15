import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import OrderStore from "../store/orderStore";

const initialState: OrderStore = {
    order: null,
    orders: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): OrderStore {
    const newState = { ...state.order };
    switch (action.type) {
        case "UPDATE_ORDER":
            return ImmutableUtils.update(state).set("order", action.payload);

        case "UPDATE_STATUS_ORDER":
            newState.status = action.payload;
            return ImmutableUtils.update(state).set("order", newState);

        case "UPDATE_CUSTOMER":
            newState.customer = action.payload;
            return ImmutableUtils.update(state).set("order", action.payload);

        case "UPDATE_ORDERS":
            newState.customer = action.payload;
            return ImmutableUtils.update(state).set("orders", action.payload);
    }
    return state;
}
