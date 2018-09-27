import { Immutable } from "immutable-typescript";
import { Products } from "../../model/Products";

interface Store {
    carousel: Products;
}

type CarouselStore = Immutable<Store>;

export default CarouselStore;
