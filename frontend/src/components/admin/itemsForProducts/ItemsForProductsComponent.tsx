import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Category } from "../../../model/Category";
import { Collection } from "../../../model/Collection";

interface ItemsForProductsProps {
    items: ReadonlyArray<Immutable<Category | Collection>> ;
    itemUuid: string;
    removeItemFromProduct: (categoryOptions: {categoryId: number, productUuid: string}) => any;
}

export class ItemsForProductsComponent extends React.Component<ItemsForProductsProps, {}> {
    public render() {
        const { items, itemUuid, removeItemFromProduct} = this.props;
        const simpleStyle = { border: "1px solid", padding: "10px", marginBottom: "10px" }; // to remove

        const listItemsForProduct = (i: ReadonlyArray<Immutable<Category>>, iUuid: string) => {
            return i.map(item => {
                return (
                    <li key={Math.random()}>
                        {item.name}
                        <button onClick={() => removeItemFromProduct({categoryId: item.id, productUuid: iUuid})}>Remove category</button>
                    </li>
                );
            });
        };
        return <ul style={simpleStyle}>{listItemsForProduct(items, itemUuid)}</ul>;
    }
}
