import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";
import PostStatusStore from "../store/postStatusStore";

const initialState: PostStatusStore = {
    postStatuses: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): PostStatusStore {
    switch (action.type) {
        case "UPDATE_POST_STATUS":
            return ImmutableUtils.update(state).set("postStatuses", action.payload);
    }
    return state;
}
