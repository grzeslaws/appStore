import { parse } from "sparkson";
import { FetchPublicProductsByCollectionMethod } from "../../components/public/products/HomePublicComponent";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { NewProduct } from "../../model/NewProduct";
import { Product } from "../../model/Product";
import { Products } from "../../model/Products";
import { Action } from "./action";
import { requestFailed } from "./fetchActions";

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
                console.error(err);
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
                console.error(err);
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

export function addProduct(payload: NewProduct, productImage: FileList, i18n: I18N) {
    const product = new NewProduct(payload.name);

    return dispatch => {
        http(endpoints.addProductImage, "file", productImage);
        return http(endpoints.products, "post", product).then(json => dispatch(fetchAdminProducts(i18n)));
    };
}

export function editProduct(productUuid: string, payload: NewProduct, i18n: I18N, productImage?: FileList) {
    return dispatch => {
        if (productImage) {
            http(endpoints.editProductImage(productUuid), "file", productImage);
        }
        if (payload.name) {
            http(endpoints.editProduct(productUuid), "put", payload).then(json => dispatch(fetchAdminProducts(i18n)));
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
