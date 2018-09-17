import {Immutable} from "immutable-typescript";
import { Product } from "../../model/Product";
import { Products } from "../../model/Products";

interface Store {
    products: Products;
    product: Product;
}

type ProductsStore = Immutable<Store>;

export default ProductsStore;
