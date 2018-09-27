import { Immutable, ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import { AdminProfile } from "./../../model/AdminProfile";

import AdminProfileStore from "../store/adminProfileStore";

const initialState: AdminProfileStore = {
    adminProfile: null,
    gettingProfileInProgress: false,
};

export default function reducer(state = initialState, action: Action<ActionType, AdminProfile | boolean>): AdminProfileStore {
    switch (action.type) {
        case "GET_ADMIN_PROFILE":
            return ImmutableUtils.update(state).set("adminProfile", action.payload as Immutable<AdminProfile>);
        case "GETTING_PROFILE_IN_PROGRESS":
            return ImmutableUtils.update(state).set("gettingProfileInProgress", action.payload as boolean);
    }
    return state;
}
