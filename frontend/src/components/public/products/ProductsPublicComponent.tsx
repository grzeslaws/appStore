import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { Products } from "../../../model/Products";
import store from "../../../redux/store/store";

import { Link } from "react-router-dom";

import { publicRoutes } from "../../../routes/publicRoutes";

import endpoints from "../../../endpoints";
import { Categories } from "../../../model/Categories";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";
import { PaginationComponent } from "../../pagination/PaginationComponent";
import { CategoriesPublicComponent } from "../categories/CategoriesPublicComponent";

export interface ProductsPublicProps {
    i18n: Immutable<I18N>;
    products: Immutable<Products>;
    fetchPublicProducts: (i18n: I18N, categorId?: number, pageNumber?: number, perPage?: number) => any;
    pageNumber: string;
    categorId: number;
    categories: Immutable<Categories>;
    getCategories: () => any;
    perPage?: string;
}

interface ProductsState {
    productName: string;
    currentProduct: string;
    productImage: FileList;
}
export class ProductsPublicComponent extends React.Component<ProductsPublicProps, ProductsState> {
    constructor(props: ProductsPublicProps) {
        super(props);

        this.state = {
            productName: "",
            currentProduct: null,
            productImage: null,
        };
    }

    public componentWillMount() {
        console.log("this.props.categorId: ", this.props.categorId);

        const currentPageNumber = this.props.pageNumber ? Number(this.props.pageNumber) : 1;
        store.dispatch(this.props.fetchPublicProducts(this.props.i18n, this.props.categorId, currentPageNumber));
    }

    public render() {
        const { products, i18n } = this.props;
        const paginationData = products
            ? {
                  hasNext: products.hasNext,
                  hasPrev: products.hasNext,
                  nextNum: products.nextNum,
                  prevNum: products.prevNum,
                  pages: products.pages,
              }
            : null;
        const productList: ReadonlyArray<JSX.Element> = products
            ? products.products.map(p => {
                  return (
                      <div style={{ border: "1px solid", marginBottom: "20px" }} key={p.id}>
                          <Link to={publicRoutes.productTemplate + p.productUuid}>{p.name}</Link>
                          <div>Quantity: {p.quantity}</div>
                          <div>Price: {p.price}</div>
                          {p.imagePath && <img style={{ maxWidth: "40px" }} src={`${endpoints.getPathForProductImage(p.imagePath)}`} />}
                      </div>
                  );
              })
            : null;

        return (
            <>
                <PublicNavigationWrapper />
                <CategoriesPublicComponent categories={this.props.categories} getCategories={this.props.getCategories} />
                {this.props.i18n.products.title}
                {productList}
                <div>
                    {products && (
                        <PaginationComponent
                            i18n={i18n}
                            paginationData={paginationData}
                            fetchDataForCurrentPage={this.fetchDataForOptions}
                            baseRoute={publicRoutes.productsTemplate}
                        />
                    )}
                </div>
            </>
        );
    }

    private fetchDataForOptions = (options: number) => {
        if (options !== Number(this.props.pageNumber)) {
            store.dispatch(this.props.fetchPublicProducts(this.props.i18n, options));
        }
    };
}
