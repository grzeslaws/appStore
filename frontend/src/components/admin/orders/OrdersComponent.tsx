import * as React from "react";

import { Immutable } from "immutable-typescript";
import { I18N } from "../../../i18n/i18n";
import { Order } from "../../../model/Order";
import { Orders } from "../../../model/Orders";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { renderStatus } from "../../../utils/utilsMethods";
import { PaginationComponent, PaginationData } from "../../pagination/PaginationComponent";
import { Label, Status, StatusWrapper, Value, WrapperOrder } from "./ordersStyled";

export interface Props {
    i18n: Immutable<I18N>;
    orders: Immutable<Orders>;
    updateOrdersAction: (pageNumber?: string) => any;
    pageNumber: string;
}

export class OrdersComponent extends React.Component<Props, {}> {
    public componentWillMount() {
        this.props.updateOrdersAction(this.props.pageNumber)(store.dispatch);
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.pageNumber !== this.props.pageNumber) {
            this.props.updateOrdersAction(nextProps.pageNumber)(store.dispatch);
        }
    }

    public render() {
        const { orders, pageNumber } = this.props;
        return (
            <>
                {this.renderOrders(orders)}
                <PaginationComponent
                    i18n={this.props.i18n}
                    paginationData={this.paginationData(orders)}
                    baseRoute={adminRoutes.ordersTemplate}
                    itemId={Number(pageNumber)}
                />
            </>
        );
    }

    private renderOrders = (ordersImmutable: Immutable<Orders>) => {
        const orders = ordersImmutable as Orders;
        const rendererOrders = orders
            ? orders.orders.map((o: Order) => {
                  return (
                      <WrapperOrder to={adminRoutes.orderTemplate(o.orderUuid)} key={o.orderUuid}>
                          <Value>
                              <Label>Date:</Label>
                              {o.timestamp.dateString}
                          </Value>
                          <Value>
                              <Label>Order id:</Label>
                              {o.orderUuid}
                          </Value>
                          <Value>
                              <Label>Total price:</Label>
                              {o.totalPrice} pln
                          </Value>
                          <StatusWrapper>
                              <Label>Status:</Label>
                              <Status status={o.status}>{renderStatus(o.status)}</Status>
                          </StatusWrapper>
                      </WrapperOrder>
                  );
              })
            : null;

        return rendererOrders;
    };

    private paginationData(ordersImmutable: Immutable<Orders>): Immutable<PaginationData> {
        const paginationData = ordersImmutable
            ? {
                  hasNext: ordersImmutable.hasNext,
                  hasPrev: ordersImmutable.hasNext,
                  nextNum: ordersImmutable.nextNum,
                  prevNum: ordersImmutable.prevNum,
                  pages: ordersImmutable.pages,
              }
            : null;

        return paginationData;
    }
}
