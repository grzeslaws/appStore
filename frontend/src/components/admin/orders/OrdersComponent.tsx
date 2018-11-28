import * as React from "react";

import { Immutable } from "immutable-typescript";
import { I18N } from "../../../i18n/i18n";
import { Order } from "../../../model/Order";
import { OrderBy, Orders } from "../../../model/Orders";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { Form, Input, Select } from "../../../theme/admin/objects/Forms";
import { renderStatus } from "../../../utils/utilsMethods";
import { PaginationComponent, PaginationData } from "../../pagination/PaginationComponent";

import { ColorPostStatus, PostStatus } from "../../../model/PostStatus";
import { H3 } from "../../../theme/admin/elements/Headings";
import { Button } from "../../../theme/admin/objects/Buttons";
import { Row, WrapperFlex, WrapperSidebar } from "../../../theme/admin/objects/Layouts";
import {
    ColorBox,
    Label,
    PostStatusLabel,
    RemovePostStatus,
    SearchInput,
    Status,
    StatusWrapper,
    Value,
    WrapperColorBox,
    WrapperContent,
    WrapperInputs,
    WrapperOrder,
    WrapperPostStatus,
    WrapperSelectMod,
} from "./ordersStyled";

export interface Props {
    i18n: Immutable<I18N>;
    orders: Immutable<Orders>;
    pageNumber: string;
    postStatuses: ReadonlyArray<Immutable<PostStatus>>;
    updateOrdersAction: (pageNumber?: string, orderBy?: OrderBy) => any;
    searchOrdersAction: (query: string, pageNumber: string) => any;
    addPostStatus: (postStatus: PostStatus) => any;
    getPostStatuses: () => any;
    removePostStatus: (postStatusId: number) => any;
}

interface State {
    orderBy: OrderBy;
    selectedColor: ColorPostStatus;
    postStatusName: string;
}

export class OrdersComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            orderBy: OrderBy.PLACEHOLDER,
            selectedColor: ColorPostStatus.GRAY,
            postStatusName: "",
        };
    }

    public componentWillMount() {
        this.props.updateOrdersAction(this.props.pageNumber)(store.dispatch);
        this.props.getPostStatuses()(store.dispatch);
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.pageNumber !== this.props.pageNumber) {
            this.props.updateOrdersAction(nextProps.pageNumber)(store.dispatch);
        }
    }

    public render() {
        const { orders, pageNumber } = this.props;
        return (
            <WrapperFlex>
                <WrapperContent>
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
                </WrapperContent>
                <WrapperSidebar>
                    <H3>Add post status</H3>
                    {this.renderPostStatuses()}
                    {this.renderColorsToSelect()}
                    <Form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.addColorPostStatus(e)}>
                        <Input type="text" name="postStatusName" onChange={this.onChange} placeholder="Post status name" />
                        <Button>Add post status</Button>
                    </Form>
                </WrapperSidebar>
            </WrapperFlex>
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

    private renderPostStatuses = (): JSX.Element => {
        const postStatuses = this.props.postStatuses
            ? this.props.postStatuses.map((ps: PostStatus) => {
                  return (
                      <PostStatusLabel key={ps.id} color={ColorPostStatus[ps.color]}>
                          {ps.name}
                          <RemovePostStatus onClick={() => this.props.removePostStatus(ps.id)(store.dispatch)}>x</RemovePostStatus>
                      </PostStatusLabel>
                  );
              })
            : null;

        return <WrapperPostStatus>{postStatuses}</WrapperPostStatus>;
    };

    private renderSearch = (): JSX.Element => {
        return (
            <SearchInput
                debounceTimeout={500}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.searchOrdersAction(e.target.value, this.props.pageNumber)(store.dispatch)}
                placeholder="Search order by id"
                name="search"
            />
        );
    };

    private renderOrderSelector = (): JSX.Element => {
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

    private onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
        const newState = {
            ...this.state,
            [e.target.name]: e.target.value,
        };
        this.setState(newState);

        if (e.target.name === "orderBy" && e.target.value !== OrderBy.PLACEHOLDER) {
            this.props.updateOrdersAction(this.props.pageNumber, OrderBy[e.target.value])(store.dispatch);
        }
    };

    private renderColorsToSelect = (): JSX.Element => {
        const colors = Object.keys(ColorPostStatus).map((c: string) => {
            return (
                <ColorBox
                    onClick={() => this.selectPostsStatusColor(ColorPostStatus[c])}
                    color={ColorPostStatus[c]}
                    isSelected={this.state.selectedColor === c || this.state.selectedColor === ColorPostStatus[c]}
                    key={c}
                />
            );
        });

        return <WrapperColorBox>{colors}</WrapperColorBox>;
    };

    private selectPostsStatusColor = (color: ColorPostStatus): void => {
        this.setState({ selectedColor: color });
    };

    private addColorPostStatus = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
        e.target.reset();

        this.props.addPostStatus({ name: this.state.postStatusName, color: this.state.selectedColor })(store.dispatch);
    };
}
