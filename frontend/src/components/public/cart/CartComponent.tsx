import { History } from "history";
import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Link, RouteProps } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { OrderItem } from "../../../model/OrderItem";
import { Product } from "../../../model/Product";
import { StatusOrder } from "../../../redux/actions/orderActions";
import store from "../../../redux/store/store";
import { publicRoutes } from "../../../routes/publicRoutes";

import * as _ from "lodash";

export interface CartProps extends RouteComponentProps<History> {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
    removeProductFromCart: (product: Immutable<Product>) => any;
    addProductToCart: (product: Immutable<Product>) => any;
    createOrderAction: (orderItems: ReadonlyArray<Immutable<OrderItem>>, totalPrice: number) => any;
    linkToPayment: string;
    status: string;
}

interface State {
    linkToPayment: string;
}

export class CartComponent extends React.Component<CartProps, State> {

    private redirectToPayment = true;

    constructor(props: CartProps) {
        super(props);

        this.state = {
            linkToPayment: null,
        };
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.linkToPayment !== null && this.redirectToPayment) {
            window.open(nextProps.linkToPayment);
            this.redirectToPayment = false;
        }

        if (_.includes([StatusOrder.completed, StatusOrder.rejected, StatusOrder.canceled], nextProps.status)) {
            console.log("nextProps.status: ", nextProps.status);

            this.props.history.push(publicRoutes.thankYouPage);
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
                <button onClick={() => this.createOrder(totalPrice)}>Create order</button>
            </>
        );
    }

    private createOrder = (totalPrice: number) => {
        this.props.createOrderAction(this.props.orderItems, totalPrice)(store.dispatch);
    };
}
