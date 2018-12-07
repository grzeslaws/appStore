import { parse } from "sparkson";
import { Message } from "src/model/Message";
import { FetchPublicProductsByCollectionMethod } from "../../components/public/home/HomePublicComponent";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { NewProduct } from "../../model/NewProduct";
import { Product } from "../../model/Product";
import { Products } from "../../model/Products";
import { MessageType } from "./../../model/Message";
import { Action } from "./action";
import { requestFailed } from "./fetchActions";
import { updateMessages } from "./messagesActions";

function updateProducts(products: Products): Action<"UPDATE_PRODUCTS", Products> {
    return {
        type: "UPDATE_PRODUCTS",
        payload: products,
    };
}

export function fetchAdminProducts(i18n: I18N, pageNumber?: number, perPage?: number) {
    return dispatch => {
        return http(endpoints.getAllAdminProducts(pageNumber, perPage))
            .then(json => {
                dispatch(updateProducts(parse(Products, json)));
            })
            .catch(err => {
                console.log(err);
                dispatch(requestFailed(i18n.errors.fetchProductsFailed, err));
            });
    };
}

export function fetchPublicProducts({ i18n, categoryId, pageNumber }: { i18n: I18N; categoryId?: number; pageNumber?: number }) {
    return dispatch => {
        return http(endpoints.getAllPublicProducts({ categoryId, pageNumber }))
            .then(json => {
                dispatch(updateProducts(parse(Products, json)));
            })
            .catch(err => {
                console.log(err);
                dispatch(requestFailed(i18n.errors.fetchProductsFailed, err));
            });
    };
}

function updateProduct(product): Action<"UPDATE_PRODUCT", Product> {
    return {
        type: "UPDATE_PRODUCT",
        payload: product,
    };
}

export function fetchPublicProduct(productUuid: string) {
    return dispatch => {
        return http(endpoints.getPublicProduct(productUuid)).then(json => dispatch(updateProduct(parse(Product, json))));
    };
}

export const fetchPublicProductsByCollection: FetchPublicProductsByCollectionMethod = ({ i18n, collectionId, pageNumber }) => {
    return dispatch => {
        return http(endpoints.getProductsByCollection({ collectionId, pageNumber })).then(json => dispatch(updateProducts(parse(Products, json))));
    };
};

export function addProduct(payload: NewProduct, productImage: FileList, pageNumber: number, i18n: I18N) {
    const product = new NewProduct(payload.name);

    return dispatch => {
        return http(endpoints.products, "post", product).then(json => dispatch(fetchAdminProducts(i18n, pageNumber)));
    };
}

export function editProduct(productUuid: string, payload: NewProduct, i18n: I18N, pageNumber: number, productImage?: FileList) {
    return dispatch => {
        if (payload.name) {
            const editProductImagePromise = productImage ? http(endpoints.editProductImage(productUuid), "file", productImage) : null;
            const editProductPromise = http(endpoints.editProduct(productUuid), "put", payload);
            return Promise.all([editProductImagePromise, editProductPromise]).then(() => {
                dispatch(fetchAdminProducts(i18n, pageNumber));
                dispatch(updateMessages({ message: "Product has been updated!", type: MessageType.succces, timeToHide: 2 }));
            });
        }
    };
}

export function deleteProduct(productUuid: string, i18n: I18N) {
    return dispatch => {
        return http(endpoints.deleteProduct(productUuid)).then(json => dispatch(fetchAdminProducts(i18n)));
    };
}

function updateCarousel(products: Products): Action<"UPDATE_CAROUSEL", Products> {
    return {
        type: "UPDATE_CAROUSEL",
        payload: products,
    };
}

export const getProductsForCarousel: FetchPublicProductsByCollectionMethod = ({ i18n, collectionId, pageNumber, perPage }) => {
    return dispatch => {
        return http(endpoints.getProductsByCollection({ collectionId, pageNumber, perPage })).then(json => dispatch(updateCarousel(parse(Products, json))));
    };
};
