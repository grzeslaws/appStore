import { Immutable } from "immutable-typescript";
import * as React from "react";
import { OrderItemSpark } from "src/model/OrderItemSpark";
import { I18N } from "../../../i18n/i18n";

export interface Props {
    i18n: Immutable<I18N>;
    status: string;
    orderUuid: string;
    orderItems: ReadonlyArray<Immutable<OrderItemSpark>>;
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
