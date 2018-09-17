import {Immutable} from "immutable-typescript";
import { OrderItem } from "../../model/orderItem";

interface Store {
    orderItems: OrderItem[];
}

type CartStore = Immutable<Store>;

export default CartStore;
