import { connect } from "react-redux";
import { addProductToCart, createOrderAction, getOrderAction, removeProductFromCart } from "../redux/actions/cartActions";
import { ApplicationStore } from "../redux/store/store";
import { CartComponent, CartProps } from "./../components/public/cart/CartComponent";

export function mapStateToProps({ i18n, cart }: ApplicationStore): CartProps {

    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
        removeProductFromCart,
        addProductToCart,
        createOrderAction,
    };
}

export default connect(mapStateToProps)(CartComponent);
