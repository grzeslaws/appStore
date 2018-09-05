import { I18nResolver } from "i18n-ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "reflect-metadata";

import { Provider } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import { i18n } from "./i18n/i18n";
import store from "./redux/store/store";

import { setI18N } from "./redux/actions/i18nActions";
import { routes } from "./routes";
import ProductsWrapper from "./wrappers/ProductsWrapper";

import "./style.scss";

const messages = new I18nResolver(i18n, "en").translation;
store.dispatch(setI18N(messages));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path={routes.products} exact={true} component={ProductsWrapper} />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
