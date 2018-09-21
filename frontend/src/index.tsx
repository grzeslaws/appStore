import { I18nResolver } from "i18n-ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "reflect-metadata";

import { Provider } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import { i18n } from "./i18n/i18n";
import store from "./redux/store/store";

import { setI18N } from "./redux/actions/i18nActions";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import HomeCustomerWrapper from "./wrappers/HomeCustomerWrapper";
import ProductsWrapper from "./wrappers/ProductsAdminWrapper";

import PrivateRouteWrapper from "./wrappers/PrivateRouteWrapper";

import { AdminDashboardComponent } from "./components/admin/adminDashboard/AdminDashboardComponent";
import { getAdminProfile } from "./redux/actions/adminProfileActions";
import "./style.scss";
import CartWrapper from "./wrappers/CartWrapper";
import CategoryPublicWrapper from "./wrappers/CategoryPublicWrapper";
import LoginWrapper from "./wrappers/LoginWrapper";
import ProductPublicWrapper from "./wrappers/ProductPublicWrapper";
import ProductsPublicWrapper from "./wrappers/ProductsPublicWrapper";

const messages = new I18nResolver(i18n, "en").translation;
store.dispatch(setI18N(messages));
getAdminProfile()(store.dispatch);
console.log("getAdminProfile()(store.dispatch);");

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <>
                {/* <Route exact={true} path={publicRoutes.main} render={() => <Redirect to={publicRoutes.productsTemplate({ pageNumber: 1 })} />} /> */}
                <Route exact={true} path={publicRoutes.main} component={ProductsPublicWrapper} />
                <Switch>
                    <Route path={publicRoutes.products} component={ProductsPublicWrapper} />
                    <Route path={publicRoutes.category} component={CategoryPublicWrapper} />
                    <Route path={publicRoutes.product} component={ProductPublicWrapper} />
                    <Route path={publicRoutes.cart} component={CartWrapper} />
                </Switch>

                <PrivateRouteWrapper path={adminRoutes.admin} component={AdminDashboardComponent} />
                <Route path={adminRoutes.products} component={ProductsWrapper} />
                <Route exact={true} path={adminRoutes.login} component={LoginWrapper} />
            </>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
