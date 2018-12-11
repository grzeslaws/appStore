import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { Message } from "../../../model/Message";
import store from "../../../redux/store/store";
import { IconToClose, Wrapper, WrapperMessage } from "./MessagesStyled";

export interface Props {
    i18n: Immutable<I18N>;
    messages: ReadonlyArray<Message>;
    removeMessage: (message: Message) => any;
}

export class MessagesComponent extends React.Component<Props, {}> {
    private static MILLIS_PER_SEC = 1000;

    public render() {
        return <Wrapper>{this.renderMessage()}</Wrapper>;
    }

    private renderMessage = () => {
        return this.props.messages
            ? this.props.messages.map(m => {
                  if (m.timeToHide) {
                      setTimeout(() => {
                          store.dispatch(this.props.removeMessage(m));
                      }, m.timeToHide * MessagesComponent.MILLIS_PER_SEC);
                  }
                  return (
                      <WrapperMessage type={m.type} show={!!m.message} key={m.timestamp}>
                          {m.message}
                          <IconToClose onClick={() => store.dispatch(this.props.removeMessage(m))} />
                      </WrapperMessage>
                  );
              })
            : null;
    };
}
