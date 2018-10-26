import { Immutable } from "immutable-typescript";
import { PostPayment } from "../../model/PostPayment";

interface Store {
    postTypes: PostPayment[];
    paymentTypes: PostPayment[];
}

type PostPaymentStore = Immutable<Store>;

export default PostPaymentStore;
