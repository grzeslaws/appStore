import { connect } from "react-redux";
import { match } from "react-router";

import { ProductsComponent, ProductsProps } from "../components/products/ProductsComponent";
import { addProduct, deleteProduct, editProduct, fetchProducts } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, products }: ApplicationStore, ownProps: { match: match<{ pageNumber: string; perPage: string }> }): ProductsProps {
    console.log(ownProps.match);

    return {
        i18n: i18n.messages,
        products: products.products,
        fetchProducts,
        addProduct,
        editProduct,
        pageNumber: ownProps.match.params.pageNumber,
        perPage: ownProps.match.params.perPage,
        deleteProduct,
    };
}

export default connect(mapStateToProps)(ProductsComponent);
