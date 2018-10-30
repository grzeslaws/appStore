import { connect } from "react-redux";
import { match } from "react-router";

import { CategoryPublicComponent as Component, CategoryPublicProps as Props } from "../components/public/category/CategoryPublicComponent";
import { getCategories } from "../redux/actions/categoriesActions";
import { fetchPublicProducts } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, products, categories }: ApplicationStore,
    ownProps: { match: match<{ pageNumber: number; perPage: number, categoryId: number }> },
): Props {

    return {
        i18n: i18n.messages,
        products: products.products,
        pageNumber: ownProps.match.params.pageNumber,
        perPage: ownProps.match.params.perPage,
        categoryId: ownProps.match.params.categoryId,
        fetchPublicProducts,
        categories: categories.categories,
        getCategories,
    };
}

export default connect(mapStateToProps)(Component);
