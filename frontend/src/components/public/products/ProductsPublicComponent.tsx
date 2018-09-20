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
import { CategoriesListPublicComponent } from "../categories/CategoriesListPublicComponent";

export interface ProductsPublicProps {
    i18n: Immutable<I18N>;
    products: Immutable<Products>;
    fetchPublicProducts: ({}) => any;
    pageNumber: number;
    categorId: number;
    categories: Immutable<Categories>;
    getCategories: () => any;
    perPage?: number;
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
        this.fetchDataForOptions({pageNumber: this.props.pageNumber});
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

    private fetchDataForOptions = ({categoryId, pageNumber}: {categoryId?: number, pageNumber: number}) => {
        this.props.fetchPublicProducts({ i18n: this.props.i18n, pageNumber })(store.dispatch);
    };
}
