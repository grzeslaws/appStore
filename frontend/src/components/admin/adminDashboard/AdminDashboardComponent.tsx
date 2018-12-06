import * as React from "react";

import { Redirect, Route } from "react-router-dom";
import { adminRoutes } from "../../../routes/adminRoutes";
import ProductsAdminWrapper from "../../../wrappers/ProductsAdminWrapper";

import { I18N } from "../../../i18n/i18n";
import { themeAdmin, ThemeProvider } from "../../../theme/admin";
import AdminNavigationWrapper from "../../../wrappers/AdminNavigationWrapper";
import MessagesWrapper from "../../../wrappers/MessagesWrapper";
import OrdersWrapper from "../../../wrappers/OrdersWrapper";
import OrderWrapper from "../../../wrappers/OrderWrapper";
import { Spinner, WrapperDashboard } from "./adminDashboardStyled";

export interface Props {
    i18n: I18N;
    spinner: number;
}

export class AdminDashboardComponent extends React.Component<Props, {}> {
    public render() {
        return (
            <ThemeProvider theme={themeAdmin}>
                <WrapperDashboard>
                    <Spinner show={this.props.spinner} />
                    <MessagesWrapper />
                    <AdminNavigationWrapper />
                    <Route exact={true} path={adminRoutes.admin} render={() => <Redirect to={adminRoutes.products} />} />
                    <Route path={adminRoutes.products} component={ProductsAdminWrapper} />
                    <Route path={adminRoutes.orders} component={OrdersWrapper} />
                    <Route path={adminRoutes.order} component={OrderWrapper} />
                </WrapperDashboard>
            </ThemeProvider>
        );
    }
}
