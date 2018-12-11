import { connect } from "react-redux";
import { showModal, updateSubmit } from "../redux/actions/modalActions";

import { match } from "react-router-dom";
import { OrderComponent as Component, Props } from "../components/admin/orders/OrderComponent";
import { cancelOrder, getSelectedOrderAction, updatePostStatusOrderAction } from "../redux/actions/orderActions";
import { getPostStatuses } from "../redux/actions/postStatusActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, order, postStatus, modal }: ApplicationStore, ownProps: { match: match<{ orderUuid: string }> },
): Props {
    return {
        i18n: i18n.messages,
        getSelectedOrderAction,
        order: order.order,
        orderUuid: ownProps.match.params.orderUuid,
        postStatuses: postStatus.postStatuses,
        getPostStatuses,
        updatePostStatusOrderAction,
        cancelOrder,
        updateSubmit,
        showModal,
        modalSubmit: modal.submit,
    };
}

export default connect(mapStateToProps)(Component);
