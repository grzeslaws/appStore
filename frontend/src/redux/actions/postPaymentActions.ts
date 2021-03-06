import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { PostPayment } from "./../../model/PostPayment";
import { PostPaymentGroup } from "./../../model/PostPaymentGroup";
import { Action } from "./action";

function updatePostPayment(postPaymentType: PostPaymentGroup): Action<"UPDATE_POST_PAYMENT_TYPES", PostPaymentGroup> {
    return {
        type: "UPDATE_POST_PAYMENT_TYPES",
        payload: postPaymentType,
    };
}

export function updatePostPaymentAction() {
    return dispatch => {
        return http(endpoints.getPostPaymentTypes, "get", {}).then(json => {
            dispatch(updatePostPayment(parse(PostPaymentGroup, json)));
        });
    };
}

export function addPostAction(name: string, cost: number) {
    return dispatch => {
        return http(endpoints.addPostType, "post", { name, cost }).then(() => {
            dispatch(updatePostPaymentAction());
        });
    };
}

export function updatePaymentPaymentAction() {
    return dispatch => {
        return http(endpoints.getPostPaymentTypes, "get", {}).then(json => {
            dispatch(updatePostPayment(parse(PostPaymentGroup, json)));
        });
    };
}

export function addPaymentAction(name: string, cost: number) {
    return dispatch => {
        return http(endpoints.addPaymentType, "post", { name, cost }).then(() => {
            dispatch(updatePostPaymentAction());
        });
    };
}

export function deletePaymentAction(id: number) {
    return dispatch => {
        return http(endpoints.deletePaymentType(id), "get", {}).then(() => dispatch(updatePostPaymentAction()));
    };
}

export function deletePostAction(id: number) {
    return dispatch => {
        return http(endpoints.deletePostType(id), "get", {}).then(() => dispatch(updatePostPaymentAction()));
    };
}
