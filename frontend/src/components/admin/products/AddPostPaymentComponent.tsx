import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { NewProduct } from "../../../model/NewProduct";
import store from "../../../redux/store/store";
import "./products-admin.scss";

export interface Props {
    i18n: Immutable<I18N>;
    addPostAction: (name: string, cost: number) => any;
}

interface State {
    postTypeName: string;
    postTypeCost: number;
}

export class AddPostPaymentComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            postTypeName: "",
            postTypeCost: 0,
        };
    }
    public render() {
        console.log(this.state);

        const { postTypeName, postTypeCost } = this.state;

        return (
            <>
                <div>Add post type</div>
                <input onChange={this.onChange} name="postTypeName" placeholder="postTypeName" />
                <input onChange={this.onChange} name="postTypeCost" type="number" min="0" placeholder="postTypeCost" />
                <br />
                <button onClick={() => this.addPostType(postTypeName, postTypeCost)}>Add post type</button>
                <br />
                <div>Add payment type</div>
                <input onChange={this.onChange} name="paymentTypeName" placeholder="paymentTypeName" />
                <input onChange={this.onChange} name="paymentTypeCost" type="number" min="0" placeholder="paymentTypeCost" />
                <br />
                <button>Save changes</button>
            </>
        );
    }

    private onChange = (e: React.ChangeEvent<any>) => {
        const newState: State = {
            ...this.state,
        };

        newState[e.target.name] = e.target.value;

        this.setState({
            ...this.state,
            ...newState,
        });
    };

    private addPostType = (name: string, cost: number) => {
        this.props.addPostAction(name, cost)(store.dispatch);
    };
}
