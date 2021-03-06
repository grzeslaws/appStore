import { connect } from "react-redux";
import { RouteProps } from "react-router-dom";
import { LoginComponent, LoginProps } from "../components/admin/login/LoginComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, adminProfile }: ApplicationStore, ownProps: RouteProps): LoginProps {
    return {
        i18n: i18n.messages,
        adminProfile: !!adminProfile.adminProfile,
        gettingProfileInProgress: adminProfile.gettingProfileInProgress,
        ...ownProps,
    };
}

export default connect(mapStateToProps)(LoginComponent);
