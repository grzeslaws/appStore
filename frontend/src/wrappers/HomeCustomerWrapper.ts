import { connect } from "react-redux";
import { HomePublicComponent, HomePublicProps } from "../components/public/home/HomePublicComponent";
import { getAdminProfile } from "../redux/actions/adminProfileActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n }: ApplicationStore): HomePublicProps {
    return {
        i18n: i18n.messages,
        getAdminProfile,
    };
}

export default connect(mapStateToProps)(HomePublicComponent);
