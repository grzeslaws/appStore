import { connect } from "react-redux";

import { match } from "react-router-dom";
import { OrderComponent as Component, Props } from "../components/admin/orders/OrderComponent";
import { getSelectedOrderAction } from "../redux/actions/orderActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, order }: ApplicationStore, ownProps: { match: match<{ orderUuid: string }> },
): Props {
    return {
        i18n: i18n.messages,
        getSelectedOrderAction,
        order: order.order,
        orderUuid: ownProps.match.params.orderUuid,
    };
}

export default connect(mapStateToProps)(Component);
