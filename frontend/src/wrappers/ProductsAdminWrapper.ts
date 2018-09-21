import { connect } from "react-redux";
import { match } from "react-router";

import { ProductsAdminComponent, ProductsProps } from "../components/admin/products/ProductsAdminComponent";
import { addCategory, deleteCategory, deleteCategoryFromProduct,  getCategories } from "../redux/actions/categoriesActions";
import { deleteCollectionFromProduct, getCollections } from "../redux/actions/collectionsActions";
import { addProduct, deleteProduct, editProduct, fetchAdminProducts } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, products, categories, collections }: ApplicationStore,
    ownProps: { match: match<{ pageNumber: string; perPage: string }> },
): ProductsProps {
    return {
        i18n: i18n.messages,
        products: products.products,
        fetchAdminProducts,
        addProduct,
        editProduct,
        pageNumber: ownProps.match.params.pageNumber,
        perPage: ownProps.match.params.perPage,
        deleteProduct,
        categories: categories.categories,
        getCategories,
        addCategory,
        deleteCategory,
        deleteCategoryFromProduct,
        deleteCollectionFromProduct,
        getCollections,
        collections: collections.collection,
    };
}

export default connect(mapStateToProps)(ProductsAdminComponent);
