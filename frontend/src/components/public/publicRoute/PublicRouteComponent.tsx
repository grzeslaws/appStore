import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Route } from "react-router-dom";
import { I18N } from "../../../i18n/i18n";
import { publicRoutes } from "../../../routes/publicRoutes";
import { ThemeProvider, themePublic } from "../../../theme/public";
import CartWrapper from "../../../wrappers/CartWrapper";
import CategoryPublicWrapper from "../../../wrappers/CategoryPublicWrapper";
import HomePublicWrapper from "../../../wrappers/HomePublicWrapper";
import ProductPublicWrapper from "../../../wrappers/ProductPublicWrapper";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";
import ThankYouPageWrapper from "../../../wrappers/ThankYouPageWrapper";
import { Wrapper } from "./PublicRouteStyled";

export interface Props {
    i18n: Immutable<I18N>;
}

export class PublicRouteComponent extends React.Component<Props, {}> {
    public render() {
        return (
            <ThemeProvider theme={themePublic}>
                <Wrapper>
                    <PublicNavigationWrapper />
                    <Route exact={true} path={publicRoutes.public} component={HomePublicWrapper} />
                    <Route exact={true} path={publicRoutes.home} component={HomePublicWrapper} />
                    <Route exact={true} path={publicRoutes.category} component={CategoryPublicWrapper} />
                    <Route exact={true} path={publicRoutes.product} component={ProductPublicWrapper} />
                    <Route exact={true} path={publicRoutes.cart} component={CartWrapper} />
                    <Route exact={true} path={publicRoutes.thankYouPage} component={ThankYouPageWrapper} />
                </Wrapper>
            </ThemeProvider>
        );
    }
}
