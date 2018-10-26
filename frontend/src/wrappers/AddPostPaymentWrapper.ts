import { connect } from "react-redux";

import { AddPostPaymentComponent as Component, Props } from "../components/admin/products/AddPostPaymentComponent";
import { addPostAction } from "../redux/actions/postPaymentActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        addPostAction,
    };
}

export default connect(mapStateToProps)(Component);
