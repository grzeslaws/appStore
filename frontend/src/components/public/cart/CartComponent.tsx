import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { OrderItem } from "../../../model/orderItem";
import { Product } from "../../../model/Product";
import store from "../../../redux/store/store";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";

export interface CartProps {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
    removeProductFromCart: (product: Product) => any;
    addProductToCart: (product: Product) => any;
}

export class CartComponent extends React.Component<CartProps, {}> {
    constructor(props: CartProps) {
        super(props);

        this.state = {};
    }

    public render() {
        const { orderItems, removeProductFromCart, addProductToCart } = this.props;
        const orderList = orderItems
            ? orderItems.map((p, i) => {
                  return (
                      <div key={i}>
                          <div>
                              Product quantity: {p.quantity}, Name: {p.product ? p.product.name : ""}
                          </div>
                          <button onClick={() => addProductToCart(p.product)(store.dispatch)}>Add one</button>
                          <button onClick={() => removeProductFromCart(p.product)(store.dispatch)}>Remove one</button>
                      </div>
                  );
              })
            : null;
        return (
            <>
                <PublicNavigationWrapper />
                {orderList}
                <br />
                Total payment:
            </>
        );
    }
}
