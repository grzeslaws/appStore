import {Immutable} from "immutable-typescript";
import { Message } from "src/model/Message";

interface Store {
    messages: Message[];
}

type MessageStore = Immutable<Store>;

export default MessageStore;
