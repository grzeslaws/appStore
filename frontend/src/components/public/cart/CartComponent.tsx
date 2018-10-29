import { History } from "history";
import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Link, RouteProps } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { Customer } from "../../../model/Customer";
import { OrderItem } from "../../../model/OrderItem";
import { PostPayment, PostPaymentEnum } from "../../../model/PostPayment";
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
    updatePostPaymentAction: () => any;
    postTypes: ReadonlyArray<Immutable<PostPayment>>;
    paymentTypes: ReadonlyArray<Immutable<PostPayment>>;
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
    paymentTypeId: number;
    postTypeId: number;
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
            paymentTypeId: null,
            postTypeId: null,
        };
    }

    public componentWillMount() {
        this.props.updatePostPaymentAction()(store.dispatch);
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
        const { orderItems, removeProductFromCart, addProductToCart, postTypes, paymentTypes } = this.props;

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
        const totalPrice = orderItems.length
            ? orderItems.map(o => o.product.price * o.quantity).reduce((item, sum) => item + sum) + this.updateTotalByPostAndPayment()
            : null;
        return (
            <>
                {orderList}
                <br />
                Total payment: {totalPrice}
                <br />
                {this.renderCustomerForm()}
                <br />
                Post type list:
                {this.renderPostPaymentTypes(PostPaymentEnum.POST, postTypes)}
                <br />
                Payment type list:
                {this.renderPostPaymentTypes(PostPaymentEnum.PAYMENT, paymentTypes)}
                <br />
                <button onClick={() => this.createOrder(totalPrice)}>Create order</button>
                <br />
                <br />
            </>
        );
    }

    private renderPostPaymentTypes = (type: PostPaymentEnum, postPaymentData: ReadonlyArray<Immutable<PostPayment>>): JSX.Element[] | null => {
        const postPaymentJsx: JSX.Element[] | null = postPaymentData
            ? postPaymentData.map((p: Immutable<PostPayment>) => {
                  return (
                      <div style={this.setStyleForPostPaymentElement(type, p.id)} key={p.id} onClick={() => this.checkPostPaymentType(type, p.id)}>
                          <span>{p.name}</span>
                          <span>{p.cost}</span>
                      </div>
                  );
              })
            : null;
        return postPaymentJsx;
    };

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

    private setStyleForPostPaymentElement = (type: PostPaymentEnum, id: number) => {
        if (type === PostPaymentEnum.POST && this.state.postTypeId === id) {
            return { color: "green" };
        }
        if (type === PostPaymentEnum.PAYMENT && this.state.paymentTypeId === id) {
            return { color: "green" };
        }
    };

    private checkPostPaymentType = (type: PostPaymentEnum, postPaymentTypeId: number) => {
        if (type === PostPaymentEnum.POST) {
            this.setState({ postTypeId: postPaymentTypeId });
        } else {
            this.setState({ paymentTypeId: postPaymentTypeId });
        }
    };

    private updateTotalByPostAndPayment = () => {
        let postAndPaymentCosts = 0;

        const checkedPostType = this.props.postTypes.find((p: Immutable<PostPayment>) => p.id === this.state.postTypeId);
        const checkedPaymentType = this.props.paymentTypes.find((p: Immutable<PostPayment>) => p.id === this.state.paymentTypeId);

        postAndPaymentCosts += checkedPostType ? checkedPostType.cost : null;
        postAndPaymentCosts += checkedPaymentType ? checkedPaymentType.cost : null;

        return postAndPaymentCosts;
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
