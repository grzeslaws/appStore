import { I18nResolver } from "i18n-ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "reflect-metadata";

import { Provider } from "react-redux";
import { Route } from "react-router";
import { HashRouter, Link, Redirect, Switch } from "react-router-dom";

import { i18n } from "./i18n/i18n";
import store from "./redux/store/store";

import { setI18N } from "./redux/actions/i18nActions";
import { adminRoutes } from "./routes/adminRutes";
import ProductsWrapper from "./wrappers/ProductsWrapper";

import "./style.scss";

const messages = new I18nResolver(i18n, "en").translation;
store.dispatch(setI18N(messages));

const fakeAuth = {
    isAuthenticated: false,
    authenticated(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    singOut(cb) {
        this.isAutthenticated = false;
        setTimeout(cb, 100);
    },
};

const Nav = () => {
    return (
        <ul>
            <li>
                <Link to={"/public"}>
                    <button>Public</button>
                </Link>
            </li>
            <li>
                <Link to={"/admin"}>
                    <button>Admin area</button>
                </Link>
            </li>
        </ul>
    );
};

const Public = () => <div>Public</div>;
const AdminComponet = () => {
    return <div>Admin area</div>;
};

const PrivateRoute = ({ component: Componet, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Componet {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

interface LoginState {
    redirectToPath: boolean;
}

class Login extends React.Component<any, LoginState> {
    constructor(props) {
        super(props);

        this.state = {
            redirectToPath: false,
        };
    }

    public render() {
        const { from } = this.props.location.state || { from: "./" };
        const loginForm = (
            <>
                {from.pathname} is protected, you should be login
                <button onClick={this.login}>Log in</button>
            </>
        );
        return this.state.redirectToPath ? <Redirect to={from} /> : <>{loginForm}</>;
    }

    private login = () => {
        fakeAuth.authenticated(() => {
            this.setState({ redirectToPath: true });
        });
    };
}
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <>
                <Nav />
                <Route path="/public" component={Public} />
                <Switch>
                    <Route path="/login" component={Login} />
                </Switch>
                <PrivateRoute path="/admin" component={AdminComponet} />
                {/* <Route path={adminRoutes.products} component={ProductsWrapper} /> */}
            </>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
