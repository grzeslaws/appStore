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
}

interface State {
    redirectToPayu: string;
}

export class CartComponent extends React.Component<CartProps, State> {
    constructor(props: CartProps) {
        super(props);

        this.state = {
            redirectToPayu: null,
        };
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

    private createOrder = () => {
        this.setState({
            redirectToPayu:
                // tslint:disable-next-line:max-line-length
                "https://secure.payu.com/pay/?orderId=SCMPGH3GJW181019GUEST000P01&token=eyJhbGciOiJIUzI1NiJ9.eyJvcmRlcklkIjoiU0NNUEdIM0dKVzE4MTAxOUdVRVNUMDAwUDAxIiwicG9zSWQiOiJ6RGVubjhoTiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0xJRU5UIl0sInBheWVyRW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImV4cCI6MTU0MDAzOTQ2OCwiaXNzIjoiUEFZVSIsImF1ZCI6ImFwaS1nYXRld2F5Iiwic3ViIjoiUGF5VSBzdWJqZWN0IiwianRpIjoiN2M4MDkxZmMtZGZhYy00NzY1LWIyZjMtYjJhZGNhZmNhOWZjIn0.o3yrfU33jSNM4aMnD56CUCEAgZqddd08KtpAc9nrrJ8",
        });
        this.props.createOrderAction(this.props.orderItems)(store.dispatch);
        setTimeout(() => {
            window.location.href = this.state.redirectToPayu;
        });
    };
}
