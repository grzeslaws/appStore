import { connect } from "react-redux";
import { match } from "react-router";

import { ProductsPublicComponent, ProductsPublicProps } from "../components/public/products/ProductsPublicComponent";
import { fetchPublicProducts } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, products }: ApplicationStore,
    ownProps: { match: match<{ pageNumber: string; perPage: string }> },
): ProductsPublicProps {

    return {
        i18n: i18n.messages,
        products: products.products,
        pageNumber: ownProps.match.params.pageNumber,
        perPage: ownProps.match.params.perPage,
        fetchPublicProducts,
    };
}

export default connect(mapStateToProps)(ProductsPublicComponent);
