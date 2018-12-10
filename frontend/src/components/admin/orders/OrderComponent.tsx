import * as React from "react";

import { ColorPostStatus, PostStatus } from "../../../model/PostStatus";
import { Headline, Label, PostStatusLabel, Row, Status, Value, ValueDescription, WrapperPostStatus, WrapperProduct } from "./ordersStyled";

import { Immutable } from "immutable-typescript";
import { Redirect } from "react-router";
import { I18N } from "../../../i18n/i18n";
import { Customer } from "../../../model/Customer";
import { Order } from "../../../model/Order";
import { OrderItemSpark } from "../../../model/OrderItemSpark";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { ButtonAlert } from "../../../theme/admin/objects/Buttons";
import { renderStatus } from "../../../utils/utilsMethods";

export interface Props {
    i18n: Immutable<I18N>;
    order: Immutable<Order>;
    getSelectedOrderAction: (OrderUuid: string, i18n: I18N) => any;
    orderUuid: string;
    postStatuses: ReadonlyArray<Immutable<PostStatus>>;
    getPostStatuses: () => any;
    updatePostStatusOrderAction: (orderUuid: string, postStatusId: number, i18n: I18N) => any;
    cancelOrder: (orderUuid: string, i18n: I18N) => any;
}

interface State {
    redirectToOrders: boolean;
}

export class OrderComponent extends React.Component<Props, State> {
    private static readonly READIRECT_AFTER_DELETE = 1000;

    constructor(props: Props) {
        super(props);

        this.state = {
            redirectToOrders: false,
        };
    }
    public componentWillMount() {
        this.props.getSelectedOrderAction(this.props.orderUuid, this.props.i18n)(store.dispatch);
        this.props.getPostStatuses()(store.dispatch);
    }

    public render() {
        return (
            <>
                <>
                    <Headline>Order details</Headline>
                    {this.renderOrderDetaild(this.props.order)}
                    <Headline>Products of order</Headline>
                    {this.props.order && this.renderProducts(this.props.order.orderItems)}
                    <ButtonAlert onClick={this.cancelOrder}>Cancel order</ButtonAlert>
                </>
                {this.state.redirectToOrders && this.props.order && <Redirect to={adminRoutes.ordersTemplate({})} />}
            </>
        );
    }

    private renderOrderDetaild = (order: Immutable<Order>): JSX.Element => {
        if (!order) {
            return null;
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
                    <Status status={order.status}>{renderStatus(order.status)}</Status>
                </Row>
                <Row>
                    <Label>Update post status:</Label>
                    {this.renderPostStatuses()}
                </Row>
            </>
        );
    };

    private renderCustomer(customer: Customer): JSX.Element {
        if (!customer) {
            return null;
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

    private renderProducts(orderItems: ReadonlyArray<Immutable<OrderItemSpark>>): JSX.Element[] {
        if (!orderItems) {
            return null;
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

        return orderItemsElement;
    }

    private renderPostStatuses = (): JSX.Element => {
        const postStatuses = this.props.postStatuses
            ? this.props.postStatuses.map((ps: PostStatus) => {
                  return (
                      <PostStatusLabel
                          isSelected={ps.id === (this.props.order.postStatus ? this.props.order.postStatus.id : null)}
                          key={ps.id}
                          color={ColorPostStatus[ps.color]}
                          onClick={() => this.props.updatePostStatusOrderAction(this.props.order.orderUuid, ps.id, this.props.i18n)(store.dispatch)}>
                          {ps.name}
                      </PostStatusLabel>
                  );
              })
            : null;

        return <WrapperPostStatus>{postStatuses}</WrapperPostStatus>;
    };

    private cancelOrder = () => {
        this.props.cancelOrder(this.props.orderUuid, this.props.i18n)(store.dispatch);
        setTimeout(() => {
            this.setState({ redirectToOrders: true });
        }, OrderComponent.READIRECT_AFTER_DELETE);
    };
}
