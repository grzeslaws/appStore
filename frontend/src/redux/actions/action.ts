export type ActionType =
    | "REQUEST_ISSUED"
    | "UPDATE_PRODUCTS"
    | "SET_I18N"
    | "REQUEST_FAILED"
    | "REQUEST_COMPLETED"
    | "GET_ADMIN_PROFILE";

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
