import { connect } from "react-redux";

import { AdminNavigationComponent as Component, Props } from "../components/admin/adminNavigation/AdminNavigationComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
    };
}

export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false },
)(Component);
