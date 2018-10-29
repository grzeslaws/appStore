import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { NewProduct } from "../../../model/NewProduct";
import { PostPayment, PostPaymentEnum } from "../../../model/PostPayment";
import store from "../../../redux/store/store";
import "./products-admin.scss";

export interface Props {
    i18n: Immutable<I18N>;
    addPostAction: (name: string, cost: number) => any;
    addPaymentAction: (name: string, cost: number) => any;
    updatePostPaymentAction: () => any;
    postTypes: ReadonlyArray<Immutable<PostPayment>>;
    paymentTypes: ReadonlyArray<Immutable<PostPayment>>;
}

interface State {
    postTypeName: string;
    postTypeCost: number;
    paymentTypeName: string;
    paymentTypeCost: number;
}

export class AddPostPaymentComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            postTypeName: "",
            postTypeCost: 0,
            paymentTypeName: "",
            paymentTypeCost: 0,
        };
    }

    public componentWillMount() {
        this.props.updatePostPaymentAction()(store.dispatch);
    }

    public render() {
        const { postTypeName, postTypeCost, paymentTypeName, paymentTypeCost } = this.state;
        const { postTypes, paymentTypes } = this.props;

        return (
            <>
                <div>Add post type</div>
                <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.addPostType(e, PostPaymentEnum.POST, postTypeName, postTypeCost)}>
                    <input onChange={this.onChange} name="postTypeName" placeholder="Post type name" />
                    <input onChange={this.onChange} name="postTypeCost" type="number" min="0" placeholder="Post type cost" />
                    <button>Add post type</button>
                </form>
                <br />
                <div>Add payment type</div>
                <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.addPostType(e, PostPaymentEnum.PAYMENT, paymentTypeName, paymentTypeCost)}>
                    <input onChange={this.onChange} name="paymentTypeName" placeholder="Payment type name" />
                    <input onChange={this.onChange} name="paymentTypeCost" type="number" min="0" placeholder="Payment type cost" />
                    <button>Add payment type</button>
                </form>
                <br />
                Post types list:
                <br />
                {this.renderPostPaymentTypes(postTypes)}
                <br />
                <br />
                Payment types list:
                <br />
                {this.renderPostPaymentTypes(paymentTypes)}
            </>
        );
    }

    private renderPostPaymentTypes = (postPaymentData: ReadonlyArray<Immutable<PostPayment>>): JSX.Element => {
        const postPaymentJsx: JSX.Element[] | null = postPaymentData
            ? postPaymentData.map((p: Immutable<PostPayment>) => {
                  return (
                      <li key={p.id}>
                          <span>{p.name}</span>
                          <span>{p.cost}</span>
                      </li>
                  );
              })
            : null;
        return <ul>{postPaymentJsx}</ul>;
    };

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: State = {
            ...this.state,
        };

        newState[e.target.name] = e.target.value;

        this.setState({
            ...this.state,
            ...newState,
        });
    };

    private addPostType = (e: React.ChangeEvent<HTMLFormElement>, type: PostPaymentEnum, name: string, cost: number) => {
        e.preventDefault();
        e.target.reset();
        if (type === PostPaymentEnum.POST) {
            this.props.addPostAction(name, cost)(store.dispatch);
            this.setState({ postTypeName: "", postTypeCost: 0 });
        } else {
            this.props.addPaymentAction(name, cost)(store.dispatch);
            this.setState({ paymentTypeName: "", postTypeCost: 0 });
        }
    };
}
