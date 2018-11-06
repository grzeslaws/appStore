import { connect } from "react-redux";
import { removeMessage } from "../redux/actions/messagesActions";
import { ApplicationStore } from "../redux/store/store";
import { MessagesComponent as Component, Props } from "./../components/public/messages/MessagesComponent";

export function mapStateToProps(
    { i18n, messages }: ApplicationStore): Props {
    return {
        i18n: i18n.messages,
        messages: messages.messages,
        removeMessage,
    };
}

export default connect(mapStateToProps)(Component);
