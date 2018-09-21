import {Immutable} from "immutable-typescript";
import { Collections } from "../../model/Collections";

interface Store {
    collection: Collections;
}

type CollectionsStore = Immutable<Store>;

export default CollectionsStore;
