import { Immutable } from "immutable-typescript";

interface Store {
    spinner: boolean;
}

type SpinnerStore = Immutable<Store>;

export default SpinnerStore;
