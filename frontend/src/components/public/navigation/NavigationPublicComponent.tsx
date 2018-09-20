import { Immutable } from "immutable-typescript";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";

import * as React from "react";
import { OrderItem } from "../../../model/orderItem";
import { Product } from "../../../model/Product";
import { adminRoutes } from "../../../routes/adminRoutes";
import { publicRoutes } from "../../../routes/publicRoutes";

export interface PublicNavigationProps {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
}

export class PublicNavigationComponent extends React.Component<PublicNavigationProps, {}> {
    public render() {
        const { orderItems } = this.props;

        const totalQuantityofProducts = orderItems.length ? orderItems.map(o => o.quantity).reduce((total, num) => total + num) : null;
        return (
            <>
                <div>Cart: {totalQuantityofProducts}</div>
                <ul>
                    <li>
                        <Link to={publicRoutes.productsTemplate({pageNumber: 1})}>
                            <button>Home</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={publicRoutes.categoryTemplate({categoryId: 1})}>
                            <button>Category</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={publicRoutes.cart}>
                            <button>Cart</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={adminRoutes.admin}>
                            <button>Admin</button>
                        </Link>
                    </li>
                </ul>
            </>
        );
    }
}
