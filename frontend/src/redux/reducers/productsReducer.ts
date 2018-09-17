import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";

import ProductsStore from "../store/productsStore";

const initialState: ProductsStore = {
    products: null,
    product: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): ProductsStore {
    switch (action.type) {
        case "UPDATE_PRODUCTS":
            return ImmutableUtils.update(state).set("products", action.payload);
        case "UPDATE_PRODUCT":
            return ImmutableUtils.update(state).set("product", action.payload);
    }
    return state;
}
