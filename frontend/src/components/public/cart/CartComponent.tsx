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
    sendOrder: () => any;
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
                <br />
                <button onClick={this.createOrder}>Create order</button>
                {this.renderMock()}
            </>
        );
    }

    private createOrder = () => {
        this.props.sendOrder();
        // this.props.createOrderAction(this.props.orderItems)(store.dispatch);
    };

    private renderMock() {
        return (
            <form method="post" action="https://secure.snd.payu.com/api/v2_1/orders">
                <input type="hidden" name="continueUrl" value="http://shop.url/continue" />
                <input type="hidden" name="currencyCode" value="PLN" />
                <input type="hidden" name="customerIp" value="123.123.123.123" />
                <input type="hidden" name="description" value="Order description" />
                <input type="hidden" name="merchantPosId" value="145227" />
                <input type="hidden" name="notifyUrl" value="http://shop.url/notify" />
                <input type="hidden" name="products[0].name" value="Product 1" />
                <input type="hidden" name="products[0].quantity" value="1" />
                <input type="hidden" name="products[0].unitPrice" value="1000" />
                <input type="hidden" name="totalAmount" value="1000" />
                <input
                    type="hidden"
                    name="OpenPayu-Signature"
                    value="sender=145227;algorithm=SHA-256;signature=bc94a8026d6032b5e216be112a5fb7544e66e23e68d44b4283ff495bdb3983a8"
                />
                <button type="submit">Pay with PayU</button>
            </form>
        );
    }
}
