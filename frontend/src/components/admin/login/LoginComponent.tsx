import "./loginStyled";

import * as React from "react";

import { Immutable } from "immutable-typescript";
import { Redirect, RouteProps } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { login } from "../../../redux/actions/adminProfileActions";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { publicRoutes } from "../../../routes/publicRoutes";
import { Button } from "../../../theme/admin/objects/Buttons";
import { Form, Input, WrapperInput } from "../../../theme/admin/objects/Forms";
import MessagesWrapper from "../../../wrappers/MessagesWrapper";
import { WrapperLogin, WrapperPage } from "./loginStyled";

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
    constructor(props: LoginProps) {
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
            <WrapperPage>
                <WrapperLogin>
                    <Form onSubmit={(e: React.MouseEvent<HTMLFormElement>) => this.login(e)}>
                        <WrapperInput>
                            <Input big={true} name="adminName" onChange={this.onChange} placeholder="Admin name" />
                        </WrapperInput>
                        <WrapperInput>
                            <Input big={true} name="password" onChange={this.onChange} placeholder="Admin passwors" />
                        </WrapperInput>
                        <Button>Log in</Button>
                        {gettingProfileInProgress && "Login in progress..."}
                    </Form>
                </WrapperLogin>
            </WrapperPage>
        );

        return adminProfile ? (
            <Redirect to={from} />
        ) : (
            <>
                <MessagesWrapper />
                {loginForm}
            </>
        );
    }

    private login = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
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
