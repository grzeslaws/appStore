import * as React from "react";

import { Redirect, Route } from "react-router-dom";
import { adminRoutes } from "../../../routes/adminRoutes";
import ProductsAdminWrapper from "../../../wrappers/ProductsAdminWrapper";

import { themeAdmin, ThemeProvider } from "../../../theme/admin";
import AdminNavigationWrapper from "../../../wrappers/AdminNavigationWrapper";
import MessagesWrapper from "../../../wrappers/MessagesWrapper";
import OrdersWrapper from "../../../wrappers/OrdersWrapper";
import OrderWrapper from "../../../wrappers/OrderWrapper";
import { WrapperDashboard } from "./dashboardStyled";

export class AdminDashboardComponent extends React.Component<{}, {}> {
    public render() {
        return (
            <ThemeProvider theme={themeAdmin}>
                <WrapperDashboard>
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
