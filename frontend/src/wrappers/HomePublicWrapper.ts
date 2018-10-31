import { connect } from "react-redux";
import { match } from "react-router";

import { HomePublicComponent as Component, HomePublicProps as Props } from "../components/public/home/HomePublicComponent";
import { getCategories } from "../redux/actions/categoriesActions";
import { getCollections } from "../redux/actions/collectionsActions";
import { fetchPublicProductsByCollection, getProductsForCarousel } from "../redux/actions/productsActions";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps(
    { i18n, products, collections, carousel }: ApplicationStore,
    ownProps: { match: match<{ pageNumber: number; perPage: number; collectionId: number }> },
): Props {
    return {
        i18n: i18n.messages,
        products: products.products,
        pageNumber: ownProps.match.params.pageNumber,
        perPage: ownProps.match.params.perPage,
        collectionId: ownProps.match.params.collectionId,
        collections: collections.collection,
        getCategories,
        fetchPublicProductsByCollection,
        getCollections,
        getProductsForCarousel,
        carouselProducts: carousel.carousel ? carousel.carousel.products : null,
    };
}

export default connect(mapStateToProps)(Component);
