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
    | "REMOVE_PRODUCT_FROM_CART";

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
