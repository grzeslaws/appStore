import { Immutable, ImmutableUtils } from "immutable-typescript";
import { Products } from "../../model/Products";
import CarouselStore from "../store/carouselStore";
import { Action, ActionType } from "./../actions/action";

const initialState: CarouselStore = {
    carousel: null,
};

export default function(state = initialState, action: Action<ActionType, Immutable<Products>>): CarouselStore {
    switch (action.type) {
        case "UPDATE_CAROUSEL":
            return ImmutableUtils.update(state).set("carousel", action.payload);
    }
    return state;
}
