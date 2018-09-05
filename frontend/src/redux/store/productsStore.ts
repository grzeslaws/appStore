import {Immutable} from "immutable-typescript";
import { Products } from "../../model/Products";

interface Store {
    products: Products;
}

type ProductsStore = Immutable<Store>;

export default ProductsStore;
