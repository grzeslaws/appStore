import { connect } from "react-redux";

import { OrdersComponent as Component, Props } from "../components/admin/orders/OrdersComponent";
import { updateOrdersAction } from "../redux/actions/orderActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, order }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        updateOrdersAction,
        orders: order.orders,
    };
}

export default connect(mapStateToProps)(Component);
