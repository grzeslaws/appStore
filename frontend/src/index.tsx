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
import ProductsWrapper from "./wrappers/ProductsAdminWrapper";

import PrivateRouteWrapper from "./wrappers/PrivateRouteWrapper";

import { AdminDashboardComponent } from "./components/admin/adminDashboard/AdminDashboardComponent";
import { getAdminProfile } from "./redux/actions/adminProfileActions";
import CartWrapper from "./wrappers/CartWrapper";
import CategoryPublicWrapper from "./wrappers/CategoryPublicWrapper";
import HomePublicWrapper from "./wrappers/HomePublicWrapper";
import LoginWrapper from "./wrappers/LoginWrapper";
import MessagesWrapper from "./wrappers/MessagesWrapper";
import ProductPublicWrapper from "./wrappers/ProductPublicWrapper";

import "./style.scss";
import PublicNavigationWrapper from "./wrappers/PublicNavigationWrapper";
import ThankYouPageWrapper from "./wrappers/ThankYouPageWrapper";

const messages = new I18nResolver(i18n, "en").translation;
store.dispatch(setI18N(messages));
getAdminProfile()(store.dispatch);
console.log("index");

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <>
                <MessagesWrapper />
                <PublicNavigationWrapper />
                <Route exact={true} path={publicRoutes.main} render={() => <Redirect to={publicRoutes.homeTemplate({})} />} />
                <Switch>
                    <Route path={publicRoutes.home} component={HomePublicWrapper} />
                    <Route path={publicRoutes.category} component={CategoryPublicWrapper} />
                    <Route path={publicRoutes.product} component={ProductPublicWrapper} />
                    <Route path={publicRoutes.cart} component={CartWrapper} />
                    <Route path={publicRoutes.thankYouPage} component={ThankYouPageWrapper} />
                </Switch>

                <PrivateRouteWrapper path={adminRoutes.admin} component={AdminDashboardComponent} />
                <Route path={adminRoutes.products} component={ProductsWrapper} />
                <Route exact={true} path={adminRoutes.login} component={LoginWrapper} />
            </>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
