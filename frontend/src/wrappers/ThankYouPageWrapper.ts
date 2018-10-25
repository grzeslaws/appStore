import { connect } from "react-redux";
import { Props, ThankYouPageComponent } from "../components/public/thankYouPage/ThankYouPageComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, order }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        status: order.order ? order.order.status : null,
        orderItems: order.order ? order.order.orderItems : null,
        orderUuid: order.order ? order.order.orderUuid : null,
        customer: order.order ? order.order.customer : null,
    };
}

export default connect(mapStateToProps)(ThankYouPageComponent);
