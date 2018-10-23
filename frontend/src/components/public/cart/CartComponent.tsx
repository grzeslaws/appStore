import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { OrderItem } from "../../../model/OrderItem";
import { Product } from "../../../model/Product";
import store from "../../../redux/store/store";
import { publicRoutes } from "../../../routes/publicRoutes";

export interface CartProps {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
    removeProductFromCart: (product: Immutable<Product>) => any;
    addProductToCart: (product: Immutable<Product>) => any;
    createOrderAction: (orderItems: ReadonlyArray<Immutable<OrderItem>>) => any;
    linkToPayment: string;
}

interface State {
    linkToPayment: string;
}

export class CartComponent extends React.Component<CartProps, State> {
    constructor(props: CartProps) {
        super(props);

        this.state = {
            linkToPayment: null,
        };
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.linkToPayment !== null) {
            window.open(nextProps.linkToPayment);
        }
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
                <br />
                <button onClick={this.createOrder}>Create order</button>
            </>
        );
    }

    private createOrder = () => this.props.createOrderAction(this.props.orderItems)(store.dispatch);
}
