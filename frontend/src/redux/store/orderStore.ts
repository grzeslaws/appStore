import { Immutable } from "immutable-typescript";
import { Order } from "../../model/Order";

interface Store {
    order: Order;
}

type OrderStore = Immutable<Store>;

export default OrderStore;
