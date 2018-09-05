import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../i18n/i18n";
import { NewProduct } from "../../model/NewProduct";
import { Products } from "../../model/Products";
import store from "../../redux/store/store";
import { AddProductComponent } from "./AddProductComponent";
import "./products.scss";

export interface ProductsProps {
    i18n: Immutable<I18N>;
    products: Immutable<Products>;
    fetchProducts: (i18n: I18N) => any;
    addProduct: (payload: NewProduct, productImage: FileList, i18n: I18N) => any;
}

interface ProductsState {
    productImg: string;
}
export class ProductsComponent extends React.Component<ProductsProps, ProductsState> {

    public componentWillMount() {
        store.dispatch(this.props.fetchProducts(this.props.i18n));
    }

    public render() {
        const { products, i18n } = this.props;
        const productList = products
            ? products.products.map(p => {
                  return (
                      <div key={p.id}>
                          {p.name}
                          {p.imagePath && <img src={`/api/get_image/${p.imagePath}`} />}
                      </div>
                  );
              })
            : null;

        return (
            <>
                <AddProductComponent i18n={i18n} addProduct={this.handleAddProduct} />
                {this.props.i18n.products.title}
                {productList}
            </>
        );
    }

    private handleAddProduct = (payload: NewProduct, productImage: FileList, i18n: I18N) => {
        store.dispatch(this.props.addProduct(payload, productImage, i18n));
    };
}
