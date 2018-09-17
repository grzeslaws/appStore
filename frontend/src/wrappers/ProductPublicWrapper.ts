import { connect } from "react-redux";
import { match } from "react-router";

import { ProductPublicComponent, ProductPublicProps } from "../components/public/product/ProductPublicComponent";
import { addProductToCart } from "../redux/actions/cartActions";
import { fetchPublicProduct } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, products }: ApplicationStore,
    ownProps: { match: match<{ productUuid: string }> },
): ProductPublicProps {

    return {
        i18n: i18n.messages,
        product: products.product,
        productUuid: ownProps.match.params.productUuid,
        fetchPublicProduct,
        addProductToCart,
    };
}

export default connect(mapStateToProps)(ProductPublicComponent);
