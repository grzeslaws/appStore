import { Immutable } from "immutable-typescript";
import { parse } from "sparkson";
import { OrderItem } from "src/model/OrderItem";
import endpoints from "../../endpoints";
import http from "../../http";
import { Order } from "../../model/Order";
import { Action } from "./action";

import * as _ from "lodash";

let stausInterval = null;
const intervalStep = 3000;

export enum StatusOrder {
    pending = "PENDING",
    waitingForConfirmation = "WAITING_FOR_CONFIRMATION",
    completed = "COMPLETED",
    canceled = "CANCELED",
    rejected = "REJECTED",
}

interface OrderUuid {
    orderUuid: string;
}

function updateOrder(order: Order): Action<"UPDATE_ORDER", Order> {
    return {
        type: "UPDATE_ORDER",
        payload: order,
    };
}

export function createOrderAction(orderItems: ReadonlyArray<Immutable<OrderItem>>, totalPrice: number) {
    return dispatch => {
        return http(endpoints.createOrder, "post", { orderItems, totalPrice }).then((json: OrderUuid) => {
            dispatch(getOrderAction(json.orderUuid));
        });
    };
}

function updateStatusOrderAction(oUuid: string) {
    return dispatch => {
        return http(endpoints.getOrder(oUuid), "get", {}).then((json: Order) => {
            console.log("json.status: ", json.status);

            dispatch(updateStatusOrder(json.status));

            if (_.includes([StatusOrder.completed, StatusOrder.rejected, StatusOrder.canceled], json.status)) {
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

export function getOrderAction(oUuid: string) {
    return dispatch => {
        const getOrderPromise = http(endpoints.getOrder(oUuid), "get", {});
        const getAccessTokenPromise = http(endpoints.getAccessToken(oUuid), "get", {});

        return Promise.all([getOrderPromise, getAccessTokenPromise]).then(json => {
            const { orderItems, orderUuid, timestamp, status, totalPrice } = json[0] as Order;
            const { linkToPayment } = json[1] as Order;

            dispatch(updateOrder(parse(Order, { orderItems, orderUuid, timestamp, linkToPayment, status, totalPrice })));
            updateStatusOrderAction(oUuid);
            stausInterval = setInterval(() => {
                dispatch(updateStatusOrderAction(oUuid));
            }, intervalStep);
        });
    };
}
