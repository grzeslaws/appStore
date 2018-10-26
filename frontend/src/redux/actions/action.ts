export type ActionType =
    | "REQUEST_ISSUED"
    | "UPDATE_PRODUCTS"
    | "SET_I18N"
    | "REQUEST_FAILED"
    | "REQUEST_COMPLETED"
    | "GET_ADMIN_PROFILE"
    | "GETTING_PROFILE_IN_PROGRESS"
    | "UPDATE_PRODUCT"
    | "ADD_PRODUCT_TO_CART"
    | "REMOVE_PRODUCT_FROM_CART"
    | "GET_CATEGORIES"
    | "GET_COLLECTIONS"
    | "UPDATE_CAROUSEL"
    | "UPDATE_MESSGAES"
    | "REMOVE_MESSGAE"
    | "UPDATE_ORDER"
    | "UPDATE_STATUS_ORDER"
    | "UPDATE_CUSTOMER"
    | "ADD_POST_TYPES"
    | "ADD_PAYMENT_TYPES"
    | "DELETE_POST_TYPES"
    | "DELETE_PAYMENT_TYPES"
    | "UPDATE_POST_PAYMENT_TYPES";

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
