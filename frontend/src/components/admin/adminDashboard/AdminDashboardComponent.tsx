import * as React from "react";

import { Link, Route } from "react-router-dom";
import { logout } from "../../../redux/actions/adminProfileActions";
import store from "../../../redux/store/store";
import { adminRoutes } from "../../../routes/adminRoutes";
import { publicRoutes } from "../../../routes/publicRoutes";

import ProductsWrapper from "../../../wrappers/ProductsAdminWrapper";

export class AdminDashboardComponent extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }
    public render() {
        console.log("AdminDashboardComponent");

        return (
            <>
                <ul>
                    <li>
                        <Link to={publicRoutes.public}>
                            <button>Home</button>
                        </Link>
                    </li>
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
                <Route path={adminRoutes.products} component={ProductsWrapper} />
            </>
        );
    }

    private logout = history => {
        logout()(store.dispatch);
        history.push(publicRoutes.main);
    };
}
