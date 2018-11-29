import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { PostPayment, PostPaymentEnum } from "../../../model/PostPayment";
import store from "../../../redux/store/store";

import { H3 } from "../../../theme/admin/elements/Headings";
import { Button } from "../../../theme/admin/objects/Buttons";
import { Form, Input } from "../../../theme/admin/objects/Forms";
import { Row } from "../../../theme/admin/objects/Layouts";
import { PostTypeItem, PostTypeRemove, PostTypeText, WrapperPostType } from "./productsStyled";

export interface Props {
    i18n: Immutable<I18N>;
    addPostAction: (name: string, cost: number) => any;
    deletePaymentAction: (id: number) => any;
    deletePostAction: (id: number) => any;
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
                <Row>
                    <H3>Post types</H3>
                    {this.renderPostPaymentTypes(postTypes, PostPaymentEnum.POST)}
                    <Form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.addPostType(e, PostPaymentEnum.POST, postTypeName, postTypeCost)}>
                        <Input onChange={this.onChange} name="postTypeName" placeholder="Post type name" />
                        <Input onChange={this.onChange} name="postTypeCost" type="number" min="0" placeholder="New post type cost" />
                        <Button disabled={!this.state.postTypeName || !this.state.postTypeCost}>Add new post type</Button>
                    </Form>
                </Row>
                <Row>
                    <H3>Payment type</H3>
                    {this.renderPostPaymentTypes(paymentTypes, PostPaymentEnum.PAYMENT)}
                    <Form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.addPostType(e, PostPaymentEnum.PAYMENT, paymentTypeName, paymentTypeCost)}>
                        <Input onChange={this.onChange} name="paymentTypeName" placeholder="Payment type name" />
                        <Input onChange={this.onChange} name="paymentTypeCost" type="number" min="0" placeholder="New payment type cost" />
                        <Button disabled={!this.state.paymentTypeName || !this.state.paymentTypeCost}>Add new payment type</Button>
                    </Form>
                </Row>
            </>
        );
    }

    private renderPostPaymentTypes = (postPaymentData: ReadonlyArray<Immutable<PostPayment>>, postPaymentEnum: PostPaymentEnum): JSX.Element => {
        const postPaymentJsx: JSX.Element[] | null = postPaymentData
            ? postPaymentData.map((p: Immutable<PostPayment>) => {
                  return (
                      <PostTypeItem key={p.id}>
                          {p.name}
                          <PostTypeText>{p.cost} pln</PostTypeText>
                          <PostTypeRemove
                              onClick={() => {
                                  postPaymentEnum === PostPaymentEnum.POST
                                      ? this.props.deletePostAction(p.id)(store.dispatch)
                                      : this.props.deletePaymentAction(p.id)(store.dispatch);
                              }}>
                              remove
                          </PostTypeRemove>
                      </PostTypeItem>
                  );
              })
            : null;
        return <WrapperPostType>{postPaymentJsx}</WrapperPostType>;
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
            this.setState({ paymentTypeName: "", paymentTypeCost: 0 });
        }
    };
}
