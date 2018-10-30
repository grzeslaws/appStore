import { connect } from "react-redux";
import { match } from "react-router";

import { PublicNavigationComponent as Component, PublicNavigationProps as Props } from "../components/public/navigation/NavigationPublicComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, cart }: ApplicationStore): Props {

    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
    };
}

export default connect(mapStateToProps)(Component);
