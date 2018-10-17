import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import OrderStore from "../store/orderStore";
import { OrderItems } from "./../store/orderStore";

const initialState: OrderStore = {
    order: null,
};

export default function reducer(state = initialState, action: Action<ActionType, OrderItems>): OrderStore {
    switch (action.type) {
        case "UPDATE_ORDER":
            return ImmutableUtils.update(state).set("order", action.payload);
    }
    return state;
}
