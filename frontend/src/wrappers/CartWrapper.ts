import { connect } from "react-redux";
import { addProductToCart, createOrderAction, getOrderAction, removeProductFromCart } from "../redux/actions/cartActions";
import { ApplicationStore } from "../redux/store/store";
import { CartComponent, CartProps } from "./../components/public/cart/CartComponent";

export function mapStateToProps({ i18n, cart, order }: ApplicationStore): CartProps {
    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
        removeProductFromCart,
        addProductToCart,
        createOrderAction,
        linkToPayment: order.order ? order.order.linkToPayment : null,
    };
}

export default connect(mapStateToProps)(CartComponent);
