import { Immutable } from "immutable-typescript";
import { parse } from "sparkson";
import { OrderItem } from "src/model/OrderItem";
import endpoints from "../../endpoints";
import http from "../../http";
import { Customer } from "../../model/Customer";
import { Order } from "../../model/Order";
import { OrderBy, Orders } from "../../model/Orders";
import { PostStatus } from "../../model/PostStatus";
import { Action } from "./action";

import * as _ from "lodash";
import { I18N } from "../../i18n/i18n";

let stausInterval = null;
const intervalStep = 3000;

export enum StatusOrderEnum {
    undefined = "UNDEFINED",
    pending = "PENDING",
    waitingForConfirmation = "WAITING_FOR_CONFIRMATION",
    completed = "COMPLETED",
    canceled = "CANCELED",
    rejected = "REJECTED",
}

interface OrderDetails {
    orderUuid: string;
    customer: Customer;
}

function updateOrder(order: Order): Action<"UPDATE_ORDER", Order> {
    return {
        type: "UPDATE_ORDER",
        payload: order,
    };
}

function updateOrders(orders: Orders): Action<"UPDATE_ORDERS", Orders> {
    return {
        type: "UPDATE_ORDERS",
        payload: orders,
    };
}

export function createOrderAction(orderItems: ReadonlyArray<Immutable<OrderItem>>, totalPrice: number, customerPayloads: Customer) {
    return dispatch => {
        return http(endpoints.createOrder, "post", { orderItems, totalPrice, customerPayloads }).then((json: OrderDetails) => {
            dispatch(getOrderAction(json.orderUuid, json.customer));
        });
    };
}

export function updateOrdersAction(pageNumber = "1", orderBy: OrderBy) {
    console.log(pageNumber, orderBy);
    return dispatch => {
        return http(endpoints.getOrders(Number(pageNumber), orderBy), "get", {}).then((json: Orders) => {
            dispatch(updateOrders(parse(Orders, json)));
        });
    };
}

function updateStatusOrderAction(oUuid: string) {
    return dispatch => {
        return http(endpoints.getOrder(oUuid), "get", {}).then((json: Order) => {
            dispatch(updateStatusOrder(json.status));

            if (_.includes([StatusOrderEnum.completed, StatusOrderEnum.rejected, StatusOrderEnum.canceled], json.status)) {
                clearInterval(stausInterval);
            }
        });
    };
}

function updateStatusOrder(status: string): Action<"UPDATE_STATUS_ORDER", string> {
    return {
        type: "UPDATE_STATUS_ORDER",
        payload: status,
    };
}

export function updatePostStatusOrderAction(orderUuid: string, postStatusId: number, i18n: I18N) {
    return dispatch => {
        return http(endpoints.updatePostStatusOrder(orderUuid, postStatusId), "get", {}).then(() => dispatch(getSelectedOrderAction(orderUuid, i18n)));
    };
}

export function getOrderAction(oUuid: string, customer: Customer) {
    return dispatch => {
        const getOrderPromise = http(endpoints.getOrder(oUuid), "get", {});
        const getAccessTokenPromise = http(endpoints.getAccessToken(oUuid), "get", {});

        return Promise.all([getOrderPromise, getAccessTokenPromise]).then(json => {
            const { orderItems, orderUuid, timestamp, status, totalPrice } = json[0] as Order;
            const { linkToPayment } = json[1] as Order;

            dispatch(updateOrder(parse(Order, { orderItems, orderUuid, timestamp, linkToPayment, status, totalPrice, customer })));
            stausInterval = setInterval(() => {
                dispatch(updateStatusOrderAction(oUuid));
            }, intervalStep);
        });
    };
}

export function getSelectedOrderAction(oUuid: string, i18n: I18N) {
    return dispatch => {
        return http(endpoints.getOrder(oUuid), "get", {}).then(json => {
            dispatch(updateOrder(parse(Order, json)));
        });
    };
}

export function searchOrdersAction(query: string, pageNumber: string) {
    return dispatch => {
        return http(endpoints.searchOrders(query, Number(pageNumber)), "get", {}).then(json => {
            dispatch(updateOrders(parse(Orders, json)));
        });
    };
}
