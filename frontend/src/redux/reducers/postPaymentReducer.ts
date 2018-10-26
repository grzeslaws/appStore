import { ImmutableUtils } from "immutable-typescript";
import { PostPayment } from "../../model/PostPayment";
import { Action, ActionType } from "../actions/action";
import PostPaymentStore from "../store/postPaymentStore";
import { PostPaymentGroup } from "./../../model/PostPaymentGroup";

const initialState: PostPaymentStore = {
    postTypes: null,
    paymentTypes: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): PostPaymentStore {
    switch (action.type) {
        case "UPDATE_POST_PAYMENT_TYPES":
            const postT = (action.payload as PostPaymentGroup).postTypes;
            const paymentT = (action.payload as PostPaymentGroup).paymentTypes;
            const postTypes = ImmutableUtils.update(state).set("postTypes", postT).postTypes;
            const paymentTypes = ImmutableUtils.update(state).set("paymentTypes", paymentT).paymentTypes;

            return { postTypes, paymentTypes };
    }
    switch (action.type) {
        case "ADD_POST_TYPES":
            const newState = { ...state.postTypes };
            newState.concat(action.payload);
            return ImmutableUtils.update(state).set("postTypes", newState);
    }
    switch (action.type) {
        case "ADD_PAYMENT_TYPES":
            const newState = { ...state.paymentTypes };
            newState.concat(action.payload);
            return ImmutableUtils.update(state).set("paymentTypes", newState);
    }
    switch (action.type) {
        case "DELETE_POST_TYPES":
            const newState = { ...state.postTypes }.filter(p => p !== action.payload);
            return ImmutableUtils.update(state).set("postTypes", newState);
    }
    switch (action.type) {
        case "DELETE_PAYMENT_TYPES":
            const newState = { ...state.paymentTypes }.filter(p => p !== action.payload);
            return ImmutableUtils.update(state).set("paymentTypes", newState);
    }
    return state;
}
