import { connect } from "react-redux";

import { AddPostPaymentComponent as Component, Props } from "../components/admin/products/AddPostPaymentComponent";
import { addPaymentAction, addPostAction, deletePaymentAction, deletePostAction, updatePostPaymentAction } from "../redux/actions/postPaymentActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, postPayment }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        addPostAction,
        addPaymentAction,
        deletePostAction,
        deletePaymentAction,
        updatePostPaymentAction,
        postTypes: postPayment.postTypes,
        paymentTypes: postPayment.paymentTypes,
    };
}

export default connect(mapStateToProps)(Component);
