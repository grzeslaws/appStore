import { History } from "history";
import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Link, RouteProps } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { Customer } from "../../../model/Customer";
import { OrderItem } from "../../../model/OrderItem";
import { PostPayment } from "../../../model/PostPayment";
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
    // paymentType: PaymentType;
    // postType: PostType;
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
            // paymentType: PaymentType.CASH_ON_DELIVERY,
            // postType: PostType.NORMAL,
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
                {/* {this.renderPostMethods()} */}
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

    // private renderPostMethods = () => {
    //     return (
    //         <>
    //             <button
    //                 onClick={() => this.onChangePostPayment("paymentType", PaymentType.CASH_ON_DELIVERY)}
    //                 style={{ color: `${this.state.paymentType === PaymentType.CASH_ON_DELIVERY ? "green" : ""}` }}>
    //                 Cash on Delivery (+ 5 pln)
    //             </button>
    //             <button
    //                 onClick={() => this.onChangePostPayment("paymentType", PaymentType.TRANSFER)}
    //                 style={{ color: `${this.state.paymentType === PaymentType.TRANSFER ? "green" : ""}` }}>
    //                 Transfer (0 pln)
    //             </button>
    //             <button
    //                 onClick={() => this.onChangePostPayment("postType", PostType.NORMAL)}
    //                 style={{ color: `${this.state.postType === PostType.NORMAL ? "green" : ""}` }}>
    //                 Courier parcel normal (+ {Constant.POST_NORMAL_COST} pln)
    //             </button>
    //             <button
    //                 onClick={() => this.onChangePostPayment("postType", PostType.EXPRESS)}
    //                 style={{ color: `${this.state.postType === PostType.EXPRESS ? "green" : ""}` }}>
    //                 Courier parcel express (+ {Constant.POST_EXPRESS_COST} pln)
    //             </button>
    //         </>
    //     );
    // };

    // private onChangePostPayment = (type: string, value: PaymentType | PostType) => {
    //     const newState = { ...this.state };
    //     newState[type] = value;
    //     this.setState({ ...newState });
    // };

    // private updateTotalByPostAndPayment = () => {
    //     let postAndPaymentCosts = 0;

    //     if (this.state.paymentType === PaymentType.CASH_ON_DELIVERY) {
    //         postAndPaymentCosts += Constant.CASH_ON_DELIVERY_COST;
    //     }

    //     if (this.state.postType === PostType.NORMAL) {
    //         postAndPaymentCosts += Constant.POST_NORMAL_COST;
    //     } else if (this.state.postType === PostType.EXPRESS) {
    //         postAndPaymentCosts += Constant.POST_EXPRESS_COST;
    //     }

    //     return postAndPaymentCosts;
    // };

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
