import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { NewProduct } from "../../../model/NewProduct";

import { H3 } from "../../../theme/admin/elements/Headings";
import { Button } from "../../../theme/admin/objects/Buttons";
import { Input } from "../../../theme/admin/objects/Forms";
import { Row } from "../../../theme/admin/objects/Layouts";

export interface ProductsProps {
    i18n: Immutable<I18N>;
    addProduct: (payload: NewProduct, productImage: FileList, i18n: I18N) => any;
}

interface AddProductState {
    productName: string;
    productImage: FileList;
}
export class AddProductAdminComponent extends React.Component<ProductsProps, AddProductState> {
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
            <Row>
                <H3>Add product</H3>
                <Input value={this.state.productName} name="productName" onChange={this.onChange} placeholder={i18n.products.productName} />
                <Button onClick={this.addProduct}>{i18n.products.addProduct}</Button>
            </Row>
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
