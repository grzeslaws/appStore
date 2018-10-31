import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { Products } from "../../../model/Products";
import store from "../../../redux/store/store";

import { Link } from "react-router-dom";

import { publicRoutes } from "../../../routes/publicRoutes";

import endpoints from "../../../endpoints";
import { Collections } from "../../../model/Collections";
import { Product } from "../../../model/Product";
import { PaginationComponent } from "../../pagination/PaginationComponent";

import styled from "../../../theme/admin";

export type FetchPublicProductsByCollectionMethod = (
    { i18n, collectionId, pageNumber, perPage }: { i18n: I18N; collectionId?: number; pageNumber?: number; perPage?: number },
) => any;

export interface HomePublicProps {
    i18n: Immutable<I18N>;
    products: Immutable<Products>;
    pageNumber: number;
    collectionId: number;
    collections: Immutable<Collections>;
    getCategories: () => any;
    fetchPublicProductsByCollection: FetchPublicProductsByCollectionMethod;
    getProductsForCarousel: FetchPublicProductsByCollectionMethod;
    getCollections: () => any;
    carouselProducts: ReadonlyArray<Immutable<Product>>;
    perPage?: number;
}

interface HomeState {
    productName: string;
    currentProduct: string;
    productImage: FileList;
}
export class HomePublicComponent extends React.Component<HomePublicProps, HomeState> {
    private static PRODUCT_NUMBER_FOR_CAROUSEL = 3;
    private static ID_COLLECTION_FOR_CAROUSEL = 2;

    constructor(props: HomePublicProps) {
        super(props);

        this.state = {
            productName: "",
            currentProduct: null,
            productImage: null,
        };
    }

    public componentWillMount() {
        this.fetchDataForOptions({ pageNumber: this.props.pageNumber });
        this.props.getCollections()(store.dispatch);
        this.props.getProductsForCarousel({
            i18n: this.props.i18n,
            perPage: HomePublicComponent.PRODUCT_NUMBER_FOR_CAROUSEL,
            collectionId: HomePublicComponent.ID_COLLECTION_FOR_CAROUSEL,
        })(store.dispatch);
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.pageNumber !== this.props.pageNumber) {
            this.fetchDataForOptions({ pageNumber: nextProps.pageNumber });
        }
    }

    public render() {
        const { products, i18n, collections, carouselProducts } = this.props;
        const paginationData = products
            ? {
                  hasNext: products.hasNext,
                  hasPrev: products.hasNext,
                  nextNum: products.nextNum,
                  prevNum: products.prevNum,
                  pages: products.pages,
              }
            : null;
        const productList: ReadonlyArray<JSX.Element> = products ? products.products.map(this.renderOneProduct) : null;

        return (
            <>
                {this.props.i18n.products.title}
                <br />
                <br />
                {carouselProducts && this.renderCarouselProducts(carouselProducts)}
                <br />
                Collection name: {collections && this.getCollectionName(collections)}
                {productList}
                <div>
                    {products && (
                        <PaginationComponent
                            i18n={i18n}
                            paginationData={paginationData}
                            baseRoute={({ itemId, pageNumber }) => publicRoutes.homeTemplate({ collectionId: itemId, pageNumber })}
                        />
                    )}
                </div>
            </>
        );
    }

    private fetchDataForOptions = ({ categoryId, pageNumber }: { categoryId?: number; pageNumber: number }) => {
        this.props.fetchPublicProductsByCollection({ i18n: this.props.i18n, collectionId: categoryId, pageNumber })(store.dispatch);
    };

    private getCollectionName(collections: Immutable<Collections>) {
        const currentCollection = collections.collections.find(c => c.id === Number(this.props.collectionId));
        return currentCollection ? currentCollection.name : null;
    }

    private renderCarouselProducts(products: ReadonlyArray<Immutable<Product>>): JSX.Element {
        const productsList = products.map(this.renderOneProduct);
        return <>{productsList}</>;
    }

    private renderOneProduct(product: Immutable<Product>): JSX.Element {
        return (
            <div style={{ border: "1px solid", marginBottom: "20px" }} key={product.id}>
                <Link to={publicRoutes.productTemplate + product.productUuid}>{product.name}</Link>
                <div>Quantity: {product.quantity}</div>
                <div>Price: {product.price}</div>
                {product.imagePath && <img style={{ maxWidth: "40px" }} src={`${endpoints.getPathForProductImage(product.imagePath)}`} />}
            </div>
        );
    }
}
