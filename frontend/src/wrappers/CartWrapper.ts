import { History } from "history";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { addProductToCart, removeProductFromCart } from "../redux/actions/cartActions";
import { createOrderAction } from "../redux/actions/orderActions";
import { updatePostPaymentAction } from "../redux/actions/postPaymentActions";
import { ApplicationStore } from "../redux/store/store";
import { CartComponent as Component, CartProps as Props } from "./../components/public/cart/CartComponent";

export function mapStateToProps({ i18n, cart, order, postPayment }: ApplicationStore, ownProps: RouteComponentProps<History>): Props {
    return {
        i18n: i18n.messages,
        orderItems: cart.orderItems,
        removeProductFromCart,
        addProductToCart,
        createOrderAction,
        linkToPayment: order.order ? order.order.linkToPayment : null,
        status: order.order ? order.order.status : null,
        updatePostPaymentAction,
        postTypes: postPayment.postTypes,
        paymentTypes: postPayment.paymentTypes,
        ...ownProps,
    };
}

export default withRouter(connect(mapStateToProps)(Component));
