import { connect } from "react-redux";
import { removeModal, updateSubmit } from "../redux/actions/modalActions";

import { AdminModalComponent as Component, Props } from "../components/admin/modal/AdminModalComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, modal }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        modal: modal.modal,
        removeModal,
        updateSubmit,
    };
}

export default connect(mapStateToProps)(Component);
