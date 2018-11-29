import { connect } from "react-redux";

import { match } from "react-router-dom";
import { OrderComponent as Component, Props } from "../components/admin/orders/OrderComponent";
import { getSelectedOrderAction, updatePostStatusOrderAction } from "../redux/actions/orderActions";
import { getPostStatuses } from "../redux/actions/postStatusActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, order, postStatus }: ApplicationStore, ownProps: { match: match<{ orderUuid: string }> },
): Props {
    return {
        i18n: i18n.messages,
        getSelectedOrderAction,
        order: order.order,
        orderUuid: ownProps.match.params.orderUuid,
        postStatuses: postStatus.postStatuses,
        getPostStatuses,
        updatePostStatusOrderAction,
    };
}

export default connect(mapStateToProps)(Component);
