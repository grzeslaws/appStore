import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAdminProfile } from "../../../redux/actions/adminProfileActions";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";

export interface PrivateRouteProps extends RouteProps {
    i18n: Immutable<I18N>;
    adminProfile: boolean;
    gettingProfileInProgress: boolean;
}

export class PrivateRouteComponent extends React.Component<PrivateRouteProps, {}> {

    public render() {
        const { adminProfile, gettingProfileInProgress, component: Component, ...rest } = this.props;

        if (gettingProfileInProgress) {
            return null;
        }

        return (
            <Route
                {...rest}
                render={props =>
                    adminProfile ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: adminRoutes.login,
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}
