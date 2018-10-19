import { Immutable } from "immutable-typescript";
import { parse } from "sparkson";
import { OrderItem } from "src/model/OrderItem";
import endpoints from "../../endpoints";
import http from "../../http";
import { OrderItemSpark } from "../../model/OrderItemSpark";
import { Product } from "../../model/Product";
import { AccessToken } from "./../../model/AccessToken";
import { Order } from "./../../model/Order";
import { Action } from "./action";

import * as $ from "jquery";

interface OrderUuid {
    orderUuid: string;
}

export function addProductToCart(product: Product): Action<"ADD_PRODUCT_TO_CART", Product> {
    return {
        type: "ADD_PRODUCT_TO_CART",
        payload: product,
    };
}

export function removeProductFromCart(product: Product): Action<"REMOVE_PRODUCT_FROM_CART", Product> {
    return {
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: product,
    };
}

function updateOrder(order: Order): Action<"UPDATE_ORDER", Order> {
    return {
        type: "UPDATE_ORDER",
        payload: order,
    };
}

export function createOrderAction(orderItems: ReadonlyArray<Immutable<OrderItem>>) {
    return dispatch => {
        return http(endpoints.createOrder, "post", { orderItems }).then((json: OrderUuid) => {
            dispatch(getOrderAction(json.orderUuid));
        });
    };
}

export function getOrderAction(orderUuid: string) {
    return dispatch => {
        return http(endpoints.getOrder(orderUuid), "get", {}).then((json: Order) => {
            dispatch(updateOrder(parse(Order, json)));
            http(endpoints.getAccessToken, "get", {});
        });
    };
}
