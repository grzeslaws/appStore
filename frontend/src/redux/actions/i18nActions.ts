import { I18N } from "../../i18n/i18n";

import {Action} from "./action";

export function setI18N(i18n: I18N): Action<"SET_I18N", I18N> {
    return {
        type: "SET_I18N",
        payload: i18n,
    };
}
