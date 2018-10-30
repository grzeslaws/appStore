import { I18nResolver } from "i18n-ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "reflect-metadata";

import { Provider } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import { i18n } from "./i18n/i18n";
import store from "./redux/store/store";

import { AdminDashboardComponent } from "./components/admin/adminDashboard/AdminDashboardComponent";
import { getAdminProfile } from "./redux/actions/adminProfileActions";
import { setI18N } from "./redux/actions/i18nActions";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import LoginWrapper from "./wrappers/LoginWrapper";
import MessagesWrapper from "./wrappers/MessagesWrapper";
import PrivateRouteWrapper from "./wrappers/PrivateRouteWrapper";
import PublicRouteWrapper from "./wrappers/PublicRouteWrapper";

const messages = new I18nResolver(i18n, "en").translation;
store.dispatch(setI18N(messages));
getAdminProfile()(store.dispatch);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <>
                <MessagesWrapper />
                <Route exact={true} path={publicRoutes.main} render={() => <Redirect to={publicRoutes.public} />} />
                <Route path={publicRoutes.public} component={PublicRouteWrapper} />
                <PrivateRouteWrapper path={adminRoutes.admin} component={AdminDashboardComponent} />
                <Route exact={true} path={publicRoutes.login} component={LoginWrapper} />
            </>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
