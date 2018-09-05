import { connect } from "react-redux";

import { ProductsComponent, ProductsProps } from "../components/products/ProductsComponent";
import { addProduct, fetchProducts } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({ i18n, products }: ApplicationStore): ProductsProps {
    return {
        i18n: i18n.messages,
        products: products.products,
        fetchProducts,
        addProduct,
    };
}

export default connect(mapStateToProps)(ProductsComponent);
