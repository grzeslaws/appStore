import * as React from "react";

import { Immutable } from "immutable-typescript";
import { DebounceInput } from "react-debounce-input";
import { I18N } from "../../../i18n/i18n";
import { Order } from "../../../model/Order";
import { OrderBy, Orders } from "../../../model/Orders";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { Select } from "../../../theme/admin/objects/Forms";
import { renderStatus } from "../../../utils/utilsMethods";
import { PaginationComponent, PaginationData } from "../../pagination/PaginationComponent";
import { Label, SearchInput, Status, StatusWrapper, Value, WrapperInputs, WrapperOrder, WrapperSelectMod } from "./ordersStyled";

export interface Props {
    i18n: Immutable<I18N>;
    orders: Immutable<Orders>;
    pageNumber: string;
    updateOrdersAction: (pageNumber?: string, orderBy?: OrderBy) => any;
    searchOrdersAction: (query: string, pageNumber: string) => any;
}

interface State {
    orderBy: OrderBy;
}

export class OrdersComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            orderBy: OrderBy.PLACEHOLDER,
        };
    }

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
                <WrapperInputs>
                    {this.renderSearch()}
                    {this.renderOrderSelector()}
                </WrapperInputs>
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
                          {o.customer.email && (
                              <Value>
                                  <Label>Customer email:</Label>
                                  {o.customer.email}
                              </Value>
                          )}
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

    private renderSearch = (): JSX.Element => {
        return (
            <SearchInput
                debounceTimeout={500}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.searchOrdersAction(e.target.value, this.props.pageNumber)(store.dispatch)}
                placeholder="Search order by id"
            />
        );
    };

    private renderOrderSelector = () => {
        const optionsElement = Object.keys(OrderBy).map((o: OrderBy) => {
            return (
                <option key={Math.random()} value={o}>
                    {OrderBy[o]}
                </option>
            );
        });
        return (
            <WrapperSelectMod big={true}>
                <Select
                    value={this.state.orderBy}
                    placeholderStyle={OrderBy[this.state.orderBy] === OrderBy.PLACEHOLDER || this.state.orderBy === OrderBy.PLACEHOLDER}
                    name="orderBy"
                    onChange={this.onChange}>
                    {optionsElement}
                </Select>
            </WrapperSelectMod>
        );
    };

    private onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newState = {
            ...this.state,
            [e.target.name]: e.target.value,
        };
        this.setState(newState);

        if (e.target.value !== OrderBy.PLACEHOLDER) {
            this.props.updateOrdersAction(this.props.pageNumber, OrderBy[e.target.value])(store.dispatch);
        }
    };
}
