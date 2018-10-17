import { Immutable } from "immutable-typescript";
import { OrderItem } from "../../model/OrderItem";

export interface OrderItems {
    orderItems: OrderItem[];
    orderUuid: string;
}

interface Store {
    order: OrderItems;
}

type OrderStore = Immutable<Store>;

export default OrderStore;
