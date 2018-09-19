import { Action, ActionType } from "../actions/action";

import { OrderItem } from "../../model/orderItem";
import { Product } from "../../model/Product";
import CartStore from "../store/cartStore";

const initialState: CartStore = {
    orderItems: [],
};

export default function reducer(state = initialState, action: Action<ActionType, Product>): CartStore {
    const currentProduct = action.payload ? state.orderItems.find(o => o.product.productUuid === action.payload.productUuid) : null;
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART":
            if (currentProduct && action.payload.quantity > currentProduct.quantity) {
                const quantity = currentProduct.quantity + 1;
                const newOrderItem = new OrderItem(action.payload, quantity);
                const newOrderItems = state.orderItems.map(o => (o.product.productUuid === currentProduct.product.productUuid ? newOrderItem : o));
                return {
                    ...state,
                    orderItems: newOrderItems,
                };
            } else if (!currentProduct && action.payload.quantity > 0) {
                return {
                    ...state,
                    orderItems: state.orderItems.concat(new OrderItem(action.payload)),
                };
            } else {
                return state;
            }

        case "REMOVE_PRODUCT_FROM_CART":
            if (currentProduct && currentProduct.quantity > 1) {
                const quantity = currentProduct.quantity - 1;
                const newOrderItem = new OrderItem(action.payload, quantity);
                const newOrderItems = state.orderItems.map(o => (o.product.productUuid === currentProduct.product.productUuid ? newOrderItem : o));
                return {
                    ...state,
                    orderItems: newOrderItems,
                };
            } else if (currentProduct && currentProduct.quantity === 1) {
                return {
                    ...state,
                    orderItems: state.orderItems.filter(o => o.product.productUuid !== currentProduct.product.productUuid),
                };
            } else {
                return state;
            }
    }
    return state;
}
