import { connect } from "react-redux";

import { Props, PublicRouteComponent as Component } from "../components/public/publicRoute/PublicRouteComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
    };
}

export default connect(mapStateToProps)(Component);
