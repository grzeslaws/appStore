import {Immutable} from "immutable-typescript";

import {I18N} from "../../i18n/i18n";

interface Store {
    messages: I18N;
}

type I18NStore = Immutable<Store>;

export default I18NStore;
