import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Customer } from "src/model/Customer";
import { I18N } from "../../../i18n/i18n";
import { OrderItemSpark } from "../../../model/OrderItemSpark";

export interface Props {
    i18n: Immutable<I18N>;
    status: string;
    orderUuid: string;
    orderItems: ReadonlyArray<Immutable<OrderItemSpark>>;
    customer: Customer;
}

export class ThankYouPageComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        const { orderItems, orderUuid, status } = this.props;
        return (
            <>
                <div>OrderUuid: {orderUuid}</div>
                <div>Status: {status}</div>
            </>
        );
    }
}
