import * as React from "react";

import { Immutable } from "immutable-typescript";
import { I18N } from "../../../i18n/i18n";
import { Customer } from "../../../model/Customer";
import { Order } from "../../../model/Order";
import { OrderItemSpark } from "../../../model/OrderItemSpark";
import store from "../../../redux/store/store";
import { Headline, Label, Row, Status, Value, ValueDescription, WrapperProduct } from "./ordersStyled";

export interface Props {
    i18n: Immutable<I18N>;
    order: Immutable<Order>;
    getSelectedOrderAction: (OrderUuid: string, i18n: I18N) => any;
    orderUuid: string;
}

export class OrderComponent extends React.Component<Props, {}> {
    public componentWillMount() {
        this.props.getSelectedOrderAction(this.props.orderUuid, this.props.i18n)(store.dispatch);
    }

    public render() {
        return (
            <>
                <Headline>Order details</Headline>
                {this.renderOrderDetaild(this.props.order)}
                <Headline>Products of order</Headline>
                {this.props.order && this.renderProducts(this.props.order.orderItems)}
            </>
        );
    }

    private renderOrderDetaild = (order: Immutable<Order>): JSX.Element => {
        if (!order) {
            return <></>;
        }
        return (
            <>
                <Row>
                    <Label>Date:</Label>
                    <Value>{order.timestamp.dateString}</Value>
                </Row>
                <Row>
                    <Label>Order id:</Label>
                    <Value>{order.orderUuid}</Value>
                </Row>
                <Row>
                    <Label>Customer:</Label>
                    {this.renderCustomer(order.customer)}
                </Row>
                <Row>
                    <Label>Total price:</Label>
                    <Value>{order.totalPrice} pln</Value>
                </Row>
                <Row>
                    <Label>Status:</Label>
                    <Status status={order.status}>{order.status ? order.status : "Undefined"}</Status>
                </Row>
            </>
        );
    };

    private renderCustomer(customer: Customer): JSX.Element {
        if (!customer) {
            return <></>;
        }
        return (
            <Value>
                {customer.customerUuid}
                {customer.firstName && ", " + customer.firstName}
                {customer.lastName && " " + customer.lastName}
                {customer.email && ", " + customer.email}
            </Value>
        );
    }

    private renderProducts(orderItems: ReadonlyArray<Immutable<OrderItemSpark>>): JSX.Element {
        if (!orderItems) {
            return <></>;
        }
        const orderItemsElement = orderItems.map(oi => {
            return (
                <WrapperProduct key={oi.product.productUuid}>
                    <Row>
                        <Label>Name:</Label>
                        <Value>{oi.product.name}</Value>
                    </Row>
                    <Row>
                        <Label>Id:</Label>
                        <Value>{oi.product.productUuid}</Value>
                    </Row>
                    <Row>
                        <Label>Price:</Label>
                        <Value>{oi.product.price} pln</Value>
                    </Row>
                    <Row>
                        <Label>Quantity:</Label>
                        <Value>{oi.quantity}</Value>
                    </Row>
                    {oi.product.description && (
                        <Row>
                            <Label>Description:</Label>
                            <ValueDescription>{oi.product.description}</ValueDescription>
                        </Row>
                    )}
                </WrapperProduct>
            );
        });

        return <>{orderItemsElement}</>;
    }
}
