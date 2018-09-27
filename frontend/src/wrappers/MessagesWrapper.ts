import { connect } from "react-redux";
import { MessagesComponent, MessagesProps } from "../components/public/messages/MessagesComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ messages }: ApplicationStore): MessagesProps {
    return {
        messages,
    };
}

export default connect(mapStateToProps)(MessagesComponent);
