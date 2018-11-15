import * as React from "react";

import { Immutable } from "immutable-typescript";
import { I18N } from "../../../i18n/i18n";
import { Order } from "../../../model/Order";
import { Orders } from "../../../model/Orders";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { DateString, Label, TotalPrice, Uuid, WrapperOrder } from "./ordersStyled";

export interface Props {
    i18n: Immutable<I18N>;
    orders: Immutable<Orders>;
    updateOrdersAction: () => any;
}

export class OrdersComponent extends React.Component<Props, {}> {
    public componentWillMount() {
        this.props.updateOrdersAction()(store.dispatch);
    }

    public render() {
        const { orders } = this.props;
        return <>{this.renderOrders(orders)}</>;
    }

    private renderOrders = (ordersImmutable: Immutable<Orders>) => {
        const orders = ordersImmutable as Orders;
        const rendererOrders = orders
            ? orders.orders.map((o: Order) => {
                  return (
                      <WrapperOrder to={adminRoutes.orderTemplate(o.orderUuid)} key={o.orderUuid}>
                          <DateString>
                              <Label>Date:</Label>
                              {o.timestamp.dateString}
                          </DateString>
                          <Uuid>
                              <Label>Order id:</Label>
                              {o.orderUuid}
                          </Uuid>
                          <TotalPrice>
                              <Label>Total price:</Label>
                              {o.totalPrice} pln
                          </TotalPrice>
                      </WrapperOrder>
                  );
              })
            : null;

        return rendererOrders;
    };
}
