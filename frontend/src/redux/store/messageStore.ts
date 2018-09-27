import {Immutable} from "immutable-typescript";

interface Store {
    successMessage: string;
    errorMessage: string;
}

type MessageStore = Immutable<Store>;

export default MessageStore;
