import { Immutable } from "immutable-typescript";
import { I18N } from "../../../i18n/i18n";

import * as React from "react";
import { OrderItem } from "../../../model/OrderItem";
import { adminRoutes } from "../../../routes/adminRoutes";
import { publicRoutes } from "../../../routes/publicRoutes";
import { Counter, Icon, MenuItem, MenuLink, WrapperCart, WrapperMenu, WrapperNav } from "./navigationStyled";

export interface PublicNavigationProps {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
}

export class PublicNavigationComponent extends React.Component<PublicNavigationProps, {}> {
    public render() {
        const { orderItems } = this.props;

        const totalQuantityofProducts = orderItems.length ? orderItems.map(o => o.quantity).reduce((total, num) => total + num) : null;
        return (
            <WrapperNav>
                <WrapperMenu>
                    <MenuItem>
                        <MenuLink activeClassName={"active"} to={publicRoutes.homeTemplate({ pageNumber: 1 })}>
                            Home
                        </MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink activeClassName={"active"} to={publicRoutes.categoryTemplate({ categoryId: 1 })}>
                            Category
                        </MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink activeClassName={"active"} to={adminRoutes.admin}>
                            Admin
                        </MenuLink>
                    </MenuItem>
                </WrapperMenu>
                <WrapperCart to={publicRoutes.cart}>
                    <Icon />
                    {totalQuantityofProducts && <Counter>{totalQuantityofProducts}</Counter>}
                </WrapperCart>
            </WrapperNav>
        );
    }
}
