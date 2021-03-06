import * as React from "react";

import { Immutable } from "immutable-typescript";
import { Route } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { logout } from "../../../redux/actions/adminProfileActions";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { publicRoutes } from "../../../routes/publicRoutes";
import { LinkStyled, LogoutButton, MenuItem, WrapperMenu, WrapperNavigation } from "./adminNavigationStyled";

export interface Props {
    i18n: Immutable<I18N>;
}

export class AdminNavigationComponent extends React.Component<{}, {}> {
    public render() {
        return (
            <WrapperNavigation>
                <WrapperMenu>
                    <MenuItem>
                        <LinkStyled activeClassName={"active"} to={publicRoutes.public}>Shop</LinkStyled>
                    </MenuItem>
                    {/* <MenuItem>
                        <LinkStyled activeClassName={"active"} exact={true} to={adminRoutes.admin}>Dashboard</LinkStyled>
                    </MenuItem> */}
                    <MenuItem>
                        <LinkStyled activeClassName={"active"} to={adminRoutes.productsTemplate({})}>Products</LinkStyled>
                    </MenuItem>
                    <MenuItem>
                        <LinkStyled activeClassName={"active"} to={adminRoutes.ordersTemplate({})}>Orders</LinkStyled>
                    </MenuItem>
                </WrapperMenu>
                <Route
                    render={({ history }) => (
                        <LogoutButton small={true} onClick={() => this.logout(history)}>
                            Logout
                        </LogoutButton>
                    )}
                />
            </WrapperNavigation>
        );
    }

    private logout = history => {
        logout()(store.dispatch);
        history.push(publicRoutes.main);
    };
}
