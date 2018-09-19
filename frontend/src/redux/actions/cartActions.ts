import endpoints from "../../endpoints";
import http from "../../http";
import { Product } from "../../model/Product";
import { Action } from "./action";
import { fetchPublicProduct } from "./productsActions";

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
