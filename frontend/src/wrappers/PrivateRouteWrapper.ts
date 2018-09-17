import { connect } from "react-redux";

import { RouteProps  } from "react-router-dom";

import { PrivateRouteComponent, PrivateRouteProps } from "../components/admin/privateRoute/PrivateRouteComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, adminProfile }: ApplicationStore, ownProps: RouteProps): PrivateRouteProps {
    return {
        i18n: i18n.messages,
        adminProfile: !!adminProfile.adminProfile,
        gettingProfileInProgress: adminProfile.gettingProfileInProgress,
        ...ownProps,
    };
}

export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false },
)(PrivateRouteComponent);
