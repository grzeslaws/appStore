import { History } from "history";
import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Link, RouteProps } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { Customer } from "../../../model/Customer";
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
    createOrderAction: (orderItems: ReadonlyArray<Immutable<OrderItem>>, totalPrice: number, customerPayload: Customer) => any;
    linkToPayment: string;
    status: string;
}

interface State {
    linkToPayment: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    zipCode: string;
    telephone: string;
}

export class CartComponent extends React.Component<CartProps, State> {
    private redirectToPayment = true;

    constructor(props: CartProps) {
        super(props);

        this.state = {
            linkToPayment: null,
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            zipCode: "",
            telephone: "",
        };
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.linkToPayment !== null && this.redirectToPayment) {
            window.open(nextProps.linkToPayment);
            this.redirectToPayment = false;
        } else if (_.includes([StatusOrder.completed, StatusOrder.rejected, StatusOrder.canceled], nextProps.status)) {
            this.props.history.push(publicRoutes.thankYouPage);
        }
    }

    public render() {
        console.log(this.state);

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
                {this.renderCustomerForm()}
                <br />
                <button onClick={() => this.createOrder(totalPrice)}>Create order</button>
            </>
        );
    }

    private renderCustomerForm = () => {
        return (
            <>
                <input value={this.state.firstName} name="firstName" onChange={this.onChange} placeholder="First name" />
                <input value={this.state.lastName} name="lastName" onChange={this.onChange} placeholder="Last name" />
                <input value={this.state.email} name="email" onChange={this.onChange} placeholder="Email" />
                <input value={this.state.street} name="street" onChange={this.onChange} placeholder="Street" />
                <input value={this.state.city} name="city" onChange={this.onChange} placeholder="City" />
                <input value={this.state.zipCode} name="zipCode" onChange={this.onChange} placeholder="Zip code" />
                <input value={this.state.telephone} name="telephone" onChange={this.onChange} placeholder="Telephone" />
            </>
        );
    };

    private onChange = (e: React.ChangeEvent<any>) => {
        const newState: State = {
            ...this.state,
        };

        newState[e.target.name] = e.target.value;

        this.setState({
            ...this.state,
            ...newState,
        });
    };

    private createOrder = (totalPrice: number) => {
        const customerPayload = { ...this.state };
        this.props.createOrderAction(this.props.orderItems, totalPrice, customerPayload)(store.dispatch);
    };
}
