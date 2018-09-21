import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { Collections } from "../../model/Collections";
import { Action } from "./action";
import { fetchAdminProducts } from "./productsActions";

function getCollectionsAction(collections: Collections): Action<"GET_COLLECTIONS", Collections> {
    return {
        type: "GET_COLLECTIONS",
        payload: collections,
    };
}

export function getCollections() {
    return dispatch => {
        return http(endpoints.getCollections).then(json => dispatch(getCollectionsAction(parse(Collections, json))));
    };
}

export function deleteCollectionFromProduct(i18n: I18N, collectionId: number, productUuid: string) {
    return dispatch => {
        return http(endpoints.deleteCollectionFromProduct(collectionId, productUuid), "get", {}).then(() => dispatch(fetchAdminProducts(i18n)));
    };
}
