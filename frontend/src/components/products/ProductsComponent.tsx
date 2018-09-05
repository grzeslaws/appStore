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
    editProduct: (productUuid: string, payload: NewProduct, i18n: I18N, productImage?: FileList) => any;
}

interface ProductsState {
    productName: string;
    currentProduct: string;
    productImage: FileList;
}
export class ProductsComponent extends React.Component<ProductsProps, ProductsState> {
    constructor(props: ProductsProps) {
        super(props);

        this.state = {
            productName: "",
            currentProduct: null,
            productImage: null,
        };
    }

    public componentWillMount() {
        store.dispatch(this.props.fetchProducts(this.props.i18n));
    }

    public render() {
        const { products, i18n } = this.props;
        const productList = products
            ? products.products.map(p => {
                  const isCurrentProduct = this.state.currentProduct === p.productUuid ? true : false;
                  return (
                      <div key={p.id}>
                          {p.name}
                          {p.imagePath && <img src={`/api/get_image/${p.imagePath}`} />}
                          <button onClick={() => this.openEditProduct(p.productUuid)}>
                              {isCurrentProduct ? i18n.products.closeEditor : i18n.products.openEditor}
                          </button>
                          {isCurrentProduct && (
                              <div>
                                  <label>{i18n.products.imageName}</label>
                                  <input value={this.state.productName} name="productName" onChange={this.onChange} placeholder={p.name} />
                                  <input type="file" name="productImage" onChange={this.onChange} />
                                  <button onClick={() => this.saveChanges(p.productUuid)}>{i18n.products.saveChanges}</button>
                              </div>
                          )}
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

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct: ProductsState = {
            ...this.state,
        };

        newProduct[e.target.name] = e.target.files ? e.target.files : e.target.value;

        this.setState({
            ...this.state,
            ...newProduct,
        });
    };

    private openEditProduct = (productUuid: string) => {
        if (this.state.currentProduct === productUuid) {
            this.setState({ currentProduct: null });
        } else {
            this.setState({ currentProduct: productUuid });
        }
    };

    private saveChanges = (productUuid: string) => {
        if (!this.state.productName && !this.state.productImage) {
            return;
        }
        const payload = new NewProduct(this.state.productName);
        store.dispatch(this.props.editProduct(productUuid, payload, this.props.i18n, this.state.productImage));
        this.setState({ currentProduct: null });
        this.setState({ productName: "" });
    };
}
