import { connect } from "react-redux";

import { match } from "react-router-dom";
import { OrdersComponent as Component, Props } from "../components/admin/orders/OrdersComponent";
import { updateOrdersAction } from "../redux/actions/orderActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, order }: ApplicationStore, ownProps: { match: match<{ pageNumber: string }> }): Props {
    return {
        i18n: i18n.messages,
        updateOrdersAction,
        orders: order.orders,
        pageNumber: ownProps.match.params.pageNumber,
    };
}

export default connect(mapStateToProps)(Component);
