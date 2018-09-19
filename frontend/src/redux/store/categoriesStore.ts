import {Immutable} from "immutable-typescript";
import { Categories } from "../../model/Categories";

interface Store {
    categories: Categories;
}

type CategoriesStore = Immutable<Store>;

export default CategoriesStore;
