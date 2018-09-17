import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";

import { Redirect, RouteProps } from "react-router-dom";
import { login } from "../../../redux/actions/adminProfileActions";
import store from "../../../redux/store/store";
import { publicRoutes } from "../../../routes/publicRoutes";

interface LoginState {
    adminName: string;
    password: string;
    redirectToPath: boolean;
}

export interface LoginProps extends RouteProps {
    i18n: Immutable<I18N>;
    adminProfile: boolean;
    gettingProfileInProgress: boolean;
}

export class LoginComponent extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            adminName: null,
            password: null,
            redirectToPath: false,
        };
    }
    public render() {
        const { from } = this.props.location.state || { from: publicRoutes.main };
        const { adminProfile, gettingProfileInProgress } = this.props;
        const loginForm = (
            <>
                <div>
                    <label>Admin name:</label>
                    <br />
                    <input name="adminName" onChange={this.onChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <br />
                    <input name="password" onChange={this.onChange} />
                </div>
                <button onClick={this.login}>Log in</button>
                {gettingProfileInProgress && "Login in progress..."}
            </>
        );

        return adminProfile ? <Redirect to={from} /> : <>{loginForm}</>;
    }

    private login = (e: React.MouseEvent<HTMLElement>) => {
        if (!this.state.adminName || !this.state.password) {
            return;
        }
        store.dispatch(login(this.state.adminName, this.state.password));
    };

    private onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
}
