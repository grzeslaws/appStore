import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import store from "../../../redux/store/store";

import endpoints from "../../../endpoints";
import { Product } from "../../../model/Product";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";

export interface ProductPublicProps {
    i18n: Immutable<I18N>;
    productUuid: string;
    product: Immutable<Product>;
    fetchPublicProduct: (productUuid: string) => any;
    addProductToCart: (product: Immutable<Product>) => any;
}

export class ProductPublicComponent extends React.Component<ProductPublicProps, {}> {
    constructor(props: ProductPublicProps) {
        super(props);

        this.state = {};
    }

    public componentWillMount() {
        this.props.fetchPublicProduct(this.props.productUuid)(store.dispatch);
    }

    public render() {
        const { product, addProductToCart } = this.props;
        return (
            <>
                <PublicNavigationWrapper />
                {product && (
                    <div>
                        Product name: {product.name}<br/>
                        Price: {product.price}<br/>
                        Quantity: {product.quantity}<br/>
                        <img style={{ maxWidth: "40px" }} src={`${endpoints.getPathForProductImage(product.imagePath)}`} />
                        <button onClick={() => store.dispatch(addProductToCart(product))}>Add to cart</button>
                    </div>
                )}
            </>
        );
    }
}
