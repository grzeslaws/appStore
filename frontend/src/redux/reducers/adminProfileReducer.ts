import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";

import AdminProfileStore from "../store/adminProfileStore";

const initialState: AdminProfileStore = {
    adminProfile: null,
    succesInGettingProfile: false,
    gettingProfileInProgress: false,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): AdminProfileStore {
    switch (action.type) {
        case "GET_ADMIN_PROFILE":
            return ImmutableUtils.update(state).set("adminProfile", action.payload);
        case "GETTING_PROFILE_IN_PROGRESS":
            return ImmutableUtils.update(state).set("gettingProfileInProgress", action.payload);
    }
    return state;
}
