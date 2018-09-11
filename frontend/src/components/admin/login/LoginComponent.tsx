import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";

import { Redirect } from "react-router-dom";
import { login } from "../../../redux/actions/adminProfileActions";

interface LoginState {
    adminName: string;
    password: string;
    redirectToPath: boolean;
}
export class LoginComponent extends React.Component<any, LoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            adminName: null,
            password: null,
            redirectToPath: false,
        };
    }
    public render() {
        const { from } = this.props.location.state || { from: "./" };

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
                {this.state.adminName}
            </>
        );
        return this.state.redirectToPath ? <Redirect to={from} /> : <>{loginForm}</>;
    }

    private login = () => login(this.state.adminName, this.state.password);

    private onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
}
