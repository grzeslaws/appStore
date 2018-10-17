import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { OrderItem } from "../../../model/OrderItem";
import { Product } from "../../../model/Product";
import store from "../../../redux/store/store";

export interface CartProps {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
    removeProductFromCart: (product: Immutable<Product>) => any;
    addProductToCart: (product: Immutable<Product>) => any;
    createOrderAction: (orderItems: ReadonlyArray<Immutable<OrderItem>>) => any;
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
                              Product quantity: {p.quantity}
                              <br />
                              Name: {p.product ? p.product.name : ""}
                              <br />
                              Price: {p.product ? p.product.price : ""}
                              <br />
                          </div>
                          <button onClick={() => store.dispatch(addProductToCart(p.product))}>Add one</button>
                          <button onClick={() => store.dispatch(removeProductFromCart(p.product))}>Remove one</button>
                      </div>
                  );
              })
            : null;
        const totalPrice = orderItems.length ? orderItems.map(o => o.product.price * o.quantity).reduce((item, sum) => item + sum) : null;
        return (
            <>
                {orderList}
                <br />
                Total payment: {totalPrice}
                <br/>
                <button onClick={this.createOrder}>Create order</button>
            </>
        );
    }

    private createOrder = () => {
        this.props.createOrderAction(this.props.orderItems)(store.dispatch);
    }
}
