import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";

import { Link, Route } from "react-router-dom";
import { logout } from "../../../redux/actions/adminProfileActions";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { publicRoutes } from "../../../routes/publicRoutes";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";

export class AdminDashboardComponent extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }
    public render() {
        return (
            <>
                <PublicNavigationWrapper />
                <ul>
                    <li>
                        <Link to={adminRoutes.admin}>
                            <button>Dashboard</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={adminRoutes.productsTemplate({})}>
                            <button>Products</button>
                        </Link>
                    </li>
                </ul>
                <div style={{ display: "flex" }}>
                    <div>Dashboard</div>
                    <Route render={({ history }) => <button onClick={() => this.logout(history)}>Logout</button>} />
                </div>
            </>
        );
    }

    private logout = history => {
        logout()(store.dispatch);
        history.push(publicRoutes.main);
    };
}
