import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { AdminProfile } from "../../model/AdminProfile";
import { NewProduct } from "../../model/NewProduct";
import { Products } from "../../model/Products";
import { Action } from "./action";
import { requestFailed } from "./fetchActions";

function getAdminProfileAction(adminProfile): Action<"GET_ADMIN_PROFILE", AdminProfile> {
    return {
        type: "GET_ADMIN_PROFILE",
        payload: adminProfile,
    };
}

export function getAdminProfile() {
    return dispatch => {
        return http(endpoints.adminProfile).then(adminProfile => {
            dispatch(getAdminProfileAction(adminProfile));
        });
    };
}

interface Token {
    token: string;
}

export function login(name: string, password: string) {

    http(endpoints.login, "post", {
        name,
        password,
    }).then(token => {
        localStorage.setItem("x-access-token", (token as Token).token);
    });
}
