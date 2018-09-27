import * as React from "react";

interface Message {
    successMessage: string;
    errorMessage: string;
}

export interface MessagesProps {
    messages: Message;
}

interface MessageState {
    showSuccessMessage: boolean;
}

export class MessagesComponent extends React.Component<MessagesProps, MessageState> {
    constructor(props: MessagesProps) {
        super(props);

        this.state = {
            showSuccessMessage: true,
        };

        console.log("sdsdsds", this.props.messages.successMessage);
    }
    public render() {
        const { successMessage, errorMessage } = this.props.messages;

        const hideMessage = () => {
            setTimeout(() => {
                this.setState({ showSuccessMessage: false });
            }, 3000);
        };
        if (successMessage) {
            hideMessage();
        }
        // console.log("sdsds", successMessage, this.state.showSuccessMessage);

        // return <div style={successMessage ? { color: "green" } : { color: "red" }}>{successMessage ? successMessage : errorMessage}</div>;
        return <>{this.state.showSuccessMessage && successMessage}</>;
    }
}
