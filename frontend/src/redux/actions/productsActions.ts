import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { NewProduct } from "../../model/NewProduct";
import { Products } from "../../model/Products";
import { Action } from "./action";
import { requestFailed } from "./fetchActions";

function updateProducts(products: Products): Action<"UPDATE_PRODUCTS", Products> {
    return {
        type: "UPDATE_PRODUCTS",
        payload: products,
    };
}

export function fetchProducts(i18n: I18N, pageNumber?: number, perPage?: number) {
    return dispatch => {
        return http(endpoints.getAllProducts(pageNumber, perPage))
            .then(json => {
                dispatch(updateProducts(parse(Products, json)));
            })
            .catch(err => {
                console.error(err);
                dispatch(requestFailed(i18n.errors.fetchProductsFailed, err));
            });
    };
}

export function addProduct(payload: NewProduct, productImage: FileList, i18n: I18N) {
    const product = new NewProduct(payload.name);

    return dispatch => {
        http(endpoints.addProductImage, "file", productImage);
        return http(endpoints.products, "post", product).then(json => dispatch(fetchProducts(i18n)));
    };
}

export function editProduct(productUuid: string, payload: NewProduct, i18n: I18N, productImage?: FileList) {
    const product = new NewProduct(payload.name);
    return dispatch => {
        if (productImage) {
            http(endpoints.editProductImage(productUuid), "file", productImage);
        }
        if (payload.name) {
            http(endpoints.editProduct(productUuid), "put", product).then(json => dispatch(fetchProducts(i18n)));
        }
    };
}

export function deleteProduct(productUuid: string, i18n: I18N) {
    return dispatch => {
        return http(endpoints.deleteProduct(productUuid)).then(json => dispatch(fetchProducts(i18n)));
    };
}
