import { History } from "history";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { addProductToCart, removeProductFromCart } from "../redux/actions/cartActions";
import { createOrderAction } from "../redux/actions/orderActions";
import { ApplicationStore } from "../redux/store/store";
import { CartComponent, CartProps } from "./../components/public/cart/CartComponent";

export function mapStateToProps({ i18n, cart, order }: ApplicationStore, ownProps: RouteComponentProps<History>): CartProps {
    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
        removeProductFromCart,
        addProductToCart,
        createOrderAction,
        linkToPayment: order.order ? order.order.linkToPayment : null,
        status: order.order ? order.order.status : null,
        ...ownProps,
    };
}

export default withRouter(connect(mapStateToProps)(CartComponent));
