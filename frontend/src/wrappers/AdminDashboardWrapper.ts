import { connect } from "react-redux";

import { AdminDashboardComponent as Component, Props } from "../components/admin/adminDashboard/AdminDashboardComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, spinner }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        spinner: spinner.spinner,
    };
}

export default connect(mapStateToProps)(Component);
