import { connect } from "react-redux";
import { ApplicationStore } from "../redux/store/store";
import { CartComponent, CartProps } from "./../components/public/cart/CartComponent";

export function mapStateToProps({ i18n, cart }: ApplicationStore): CartProps {

    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
    };
}

export default connect(mapStateToProps)(CartComponent);
