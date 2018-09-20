import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { Category } from "../../model/Category";
import { Categories } from "./../../model/Categories";
import { Action } from "./action";

function getCategoriesAction(categories: Categories): Action<"GET_CATEGORIES", Categories> {
    return {
        type: "GET_CATEGORIES",
        payload: categories,
    };
}

export function getCategories() {
    return dispatch => {
        return http(endpoints.getCategories).then(json => dispatch(getCategoriesAction(parse(Categories, json))));
    };
}

export function addCategory(categoryName: string) {
    return dispatch => {
        return http(endpoints.addCategory, "post", { categoryName }).then(() => dispatch(getCategories()));
    };
}

export function deleteCategory(categoryId: number) {
    return dispatch => {
        return http(endpoints.deleteCategory(categoryId), "get", {}).then(() => dispatch(getCategories()));
    };
}
