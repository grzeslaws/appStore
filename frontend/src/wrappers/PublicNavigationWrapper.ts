import { connect } from "react-redux";
import { match } from "react-router";

import { PublicNavigationComponent, PublicNavigationProps } from "../components/public/navigation/NavigationPublicComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, cart }: ApplicationStore): PublicNavigationProps {

    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
    };
}

export default connect(mapStateToProps)(PublicNavigationComponent);
