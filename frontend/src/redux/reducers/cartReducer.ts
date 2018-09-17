import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";

import { OrderItem } from "../../model/orderItem";
import { Product } from "../../model/Product";
import CartStore from "../store/cartStore";

const initialState: CartStore = {
    orderItems: [],
};

export default function reducer(state = initialState, action: Action<ActionType, Product>): CartStore {
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART":
            const currentProduct = state.orderItems.find(o => o.product.productUuid === action.payload.productUuid);

            if (currentProduct) {
                const quantity = currentProduct.quantity + 1;
                const newOrderItem = new OrderItem(action.payload, quantity);
                const newOrderItems = state.orderItems.map(o => (o.product.productUuid === currentProduct.product.productUuid ? newOrderItem : o));
                return {
                    ...state,
                    orderItems: newOrderItems,
                };
            } else {
                return {
                    ...state,
                    orderItems: state.orderItems.concat(new OrderItem(action.payload)),
                };
            }
    }
    return state;
}
