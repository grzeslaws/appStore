import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../i18n/i18n";
import { NewProduct } from "../../model/NewProduct";
import store from "../../redux/store/store";
import "./products.scss";

export interface ProductsProps {
    i18n: Immutable<I18N>;
    addProduct: (payload: NewProduct, productImage: FileList, i18n: I18N) => any;
}

interface AddProductState {
    productName: string;
    productImage: FileList;
}
export class AddProductComponent extends React.Component<ProductsProps, AddProductState> {
    constructor(props: ProductsProps) {
        super(props);

        this.state = {
            productName: "",
            productImage: null,
        };
    }
    public render() {
        const { i18n } = this.props;

        return (
            <>
                <div>
                    <label>{i18n.products.productName} </label>
                    <input value={this.state.productName} name="productName" onChange={this.onChange} />
                </div>
                <div>
                    <label>{i18n.products.imageName} </label>
                    <input type="file" name="productImage" onChange={this.onChange} />
                </div>
                <button onClick={this.addProduct}>{i18n.products.addProduct}</button>
            </>
        );
    }

    private addProduct = () => {
        this.props.addProduct({ name: this.state.productName }, this.state.productImage, this.props.i18n);
        this.setState({ productName: "" });
    };

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct: AddProductState = {
            ...this.state,
        };

        newProduct[e.target.name] = e.target.files ? e.target.files : e.target.value;

        this.setState({
            ...this.state,
            ...newProduct,
        });
    };
}
