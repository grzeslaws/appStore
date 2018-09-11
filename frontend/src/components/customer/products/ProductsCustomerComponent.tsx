import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { NewProduct } from "../../../model/NewProduct";
import { Product } from "../../../model/Product";
import { Products } from "../../../model/Products";
import store from "../../../redux/store/store";

import endpoints from "../../../endpoints";
import "./products-admin.scss";

export interface ProductsProps {
    i18n: Immutable<I18N>;
    products: Immutable<Products>;
    fetchProducts: (i18n: I18N, pageNumber?: number, perPage?: number) => any;
    pageNumber: string;
    perPage?: string;
}

interface ProductsState {
    productName: string;
    productImage: FileList;
}
export class ProductsCustomerComponent extends React.Component<ProductsProps, ProductsState> {
    constructor(props: ProductsProps) {
        super(props);

        this.state = {
            productName: "",
            productImage: null,
        };
    }

    // public componentDidMount() {
    //     const currentPageNumber = this.props.pageNumber ? Number(this.props.pageNumber) : 1;
    //     store.dispatch(this.props.fetchProductsForCustomer(this.props.i18n, currentPageNumber));
    // }

    // public render() {
    // }

    private fetchDataForCurrentPage(pageNumber) {
        if (pageNumber !== Number(this.props.pageNumber)) {
            store.dispatch(this.props.fetchProducts(this.props.i18n, pageNumber));
        }
    }
}
