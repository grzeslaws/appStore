import endpoints from "../../endpoints";
import http from "../../http";
import { I18N } from "../../i18n/i18n";
import { AdminProfile } from "../../model/AdminProfile";
import { MessageType } from "../../model/Message";
import store from "../store/store";
import { Action } from "./action";
import { showMessage } from "./messagesActions";

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
    return async dispatch => {
        try {
            const token = await http(endpoints.login, "post", {
                name,
                password,
            });
            localStorage.setItem("x-access-token", (token as Token).token);
            dispatch(getAdminProfile());
        } catch (e) {
            showMessage({ message: "Not allowed extension", type: MessageType.error })(store.dispatch);
        }
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("x-access-token");
        dispatch(getAdminProfile());
    };
}
