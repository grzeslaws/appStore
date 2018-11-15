import { Immutable } from "immutable-typescript";
import { Order } from "../../model/Order";
import { Orders } from "../../model/Orders";

interface Store {
    order: Order;
    orders: Orders;
}

type OrderStore = Immutable<Store>;

export default OrderStore;
