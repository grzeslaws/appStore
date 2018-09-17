import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { NewProduct } from "../../model/NewProduct";
import { Product } from "../../model/Product";
import { Products } from "../../model/Products";
import { Action } from "./action";
import { requestFailed } from "./fetchActions";

export function addProductToCart(product: Product): Action<"ADD_PRODUCT_TO_CART", Product> {
    return {
        type: "ADD_PRODUCT_TO_CART",
        payload: product,
    };
}
