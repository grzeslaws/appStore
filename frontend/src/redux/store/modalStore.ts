import { Immutable } from "immutable-typescript";
import { ModalContent } from "../../model/ModalContent";

interface Store {
    modal: ModalContent;
    submit: boolean;
}

type ModalStore = Immutable<Store>;

export default ModalStore;
