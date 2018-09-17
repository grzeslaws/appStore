import { parse } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { AdminProfile } from "../../model/AdminProfile";
import { NewProduct } from "../../model/NewProduct";
import { Products } from "../../model/Products";
import { Action } from "./action";
import { requestFailed } from "./fetchActions";

function getAdminProfileAction(adminProfile): Action<"GET_ADMIN_PROFILE", AdminProfile | null> {
    return {
        type: "GET_ADMIN_PROFILE",
        payload: adminProfile,
    };
}

function gettingProfileInProgress(isInProgress): Action<"GETTING_PROFILE_IN_PROGRESS", boolean> {
    return {
        type: "GETTING_PROFILE_IN_PROGRESS",
        payload: isInProgress,
    };
}

export function getAdminProfile() {
    return dispatch => {
        dispatch(gettingProfileInProgress(true));
        return http(endpoints.adminProfile, "get", {})
            .then(adminProfile => {
                dispatch(gettingProfileInProgress(false));
                dispatch(getAdminProfileAction(adminProfile));
            })
            .catch(err => {
                dispatch(gettingProfileInProgress(false));
                dispatch(getAdminProfileAction(null));
            });
    };
}

interface Token {
    token: string;
}

export function login(name: string, password: string): any {
    return dispatch => {
        return http(endpoints.login, "post", {
            name,
            password,
        }).then(token => {
            localStorage.setItem("x-access-token", (token as Token).token);
            dispatch(getAdminProfile());
        });
    };
}

export function logout() {
    localStorage.removeItem("x-access-token");
}
