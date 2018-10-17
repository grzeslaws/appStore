import {Immutable} from "immutable-typescript";
import { OrderItem } from "../../model/OrderItem";

interface Store {
    orderItems: OrderItem[];
}

type CartStore = Immutable<Store>;

export default CartStore;
