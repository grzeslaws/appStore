import { Immutable } from "immutable-typescript";

interface Store {
    spinner: number;
}

type SpinnerStore = Immutable<Store>;

export default SpinnerStore;
