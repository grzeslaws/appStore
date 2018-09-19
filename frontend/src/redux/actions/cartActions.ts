import endpoints from "../../endpoints";
import http from "../../http";
import { Product } from "../../model/Product";
import { Action } from "./action";
import { fetchPublicProduct } from "./productsActions";

function addProductToCartAction(product: Product): Action<"ADD_PRODUCT_TO_CART", Product> {
    return {
        type: "ADD_PRODUCT_TO_CART",
        payload: product,
    };
}

export function addProductToCart(product: Product) {
    return dispatch => {
        return http(endpoints.removeOneProduct(product.productUuid)).then(() => {
            dispatch(addProductToCartAction(product));
            dispatch(fetchPublicProduct(product.productUuid));
        });
    };
}

function removeProductFromCartAction(product: Product): Action<"REMOVE_PRODUCT_FROM_CART", Product> {
    return {
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: product,
    };
}

export function removeProductFromCart(product: Product) {
    return dispatch => {
        return http(endpoints.addOneProduct(product.productUuid)).then(() => {
            dispatch(removeProductFromCartAction(product));
            dispatch(fetchPublicProduct(product.productUuid));
        });
    };
}
