import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";

export interface HomePublicProps {
    i18n: Immutable<I18N>;
    getAdminProfile: () => any;
}

export class HomePublicComponent extends React.Component<HomePublicProps, {}> {
    public render() {
        return (
            <>
                <PublicNavigationWrapper /> HomeCustomerComponent
            </>
        );
    }
}
