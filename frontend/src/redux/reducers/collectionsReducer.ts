import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";

import CollectionsStore from "../store/CollectionsStore";

const initialState: CollectionsStore = {
    collection: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): CollectionsStore {
    switch (action.type) {
        case "GET_COLLECTIONS":
            return ImmutableUtils.update(state).set("collection", action.payload);
    }
    return state;
}
