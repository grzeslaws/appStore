import { Immutable } from "immutable-typescript";
import { PostStatus } from "../../model/PostStatus";

interface Store {
    postStatuses: PostStatus[];
}

type PostStatusStore = Immutable<Store>;

export default PostStatusStore;
