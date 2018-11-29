import "reflect-metadata";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { HashRouter, Redirect, Route } from "react-router-dom";
import { ThemeProvider, injectGlobal, themeAdmin } from "./theme/admin";

import { I18nResolver } from "i18n-ts";
import { Provider } from "react-redux";
import { AdminDashboardComponent } from "./components/admin/adminDashboard/AdminDashboardComponent";
import { i18n } from "./i18n/i18n";
import { getAdminProfile } from "./redux/actions/adminProfileActions";
import { setI18N } from "./redux/actions/i18nActions";
import store from "./redux/store/store";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { registerCustomMappers } from "./sparksonConfig";
import boxSizing from "./theme/admin/generic/box-sizing";
import normalize from "./theme/admin/generic/normalize";
import reset from "./theme/admin/generic/reset";
import fonts from "./theme/admin/settings/fonts";
import LoginWrapper from "./wrappers/LoginWrapper";
import AdminRouteWrapper from "./wrappers/PrivateRouteWrapper";
import PublicRouteWrapper from "./wrappers/PublicRouteWrapper";

registerCustomMappers();

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    ${fonts}
    ${boxSizing}
    ${normalize}
    ${reset}

    html,
    body {
        height: 100%;
        margin: 0;
    }

    #app {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
`;

const messages = new I18nResolver(i18n, "en").translation;
store.dispatch(setI18N(messages));
getAdminProfile()(store.dispatch);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <>
                <Route exact={true} path={publicRoutes.main} render={() => <Redirect to={publicRoutes.public} />} />
                <Route path={publicRoutes.public} component={PublicRouteWrapper} />
                <AdminRouteWrapper path={adminRoutes.admin} component={AdminDashboardComponent} />
                <ThemeProvider theme={themeAdmin}>
                    <Route exact={true} path={publicRoutes.login} component={LoginWrapper} />
                </ThemeProvider>
            </>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
