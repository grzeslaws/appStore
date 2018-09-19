import { ImmutableUtils } from "immutable-typescript";
import { Action, ActionType } from "../actions/action";

import CategoriesStore from "../store/CategoriesStore";

const initialState: CategoriesStore = {
    categories: null,
};

export default function reducer(state = initialState, action: Action<ActionType, any>): CategoriesStore {
    switch (action.type) {
        case "GET_CATEGORIES":
            return ImmutableUtils.update(state).set("categories", action.payload);
    }
    return state;
}
