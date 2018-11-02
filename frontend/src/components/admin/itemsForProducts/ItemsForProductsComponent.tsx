import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Category } from "../../../model/Category";
import { Collection } from "../../../model/Collection";
import { Item, ItemRemove, WrapperItems } from "./itemsForProductStyled";

interface ItemsForProductsProps {
    items: ReadonlyArray<Immutable<Category | Collection>> ;
    itemUuid: string;
    removeItemFromProduct: (categoryOptions: {categoryId: number, productUuid: string}) => any;
}

export class ItemsForProductsComponent extends React.Component<ItemsForProductsProps, {}> {
    public render() {
        const { items, itemUuid, removeItemFromProduct} = this.props;

        const listItemsForProduct = (i: ReadonlyArray<Immutable<Category>>, iUuid: string) => {
            return i.map(item => {
                return (
                    <Item key={Math.random()}>
                        {item.name}<ItemRemove onClick={() => removeItemFromProduct({categoryId: item.id, productUuid: iUuid})}>remove</ItemRemove>
                    </Item>
                );
            });
        };
        return <WrapperItems>{listItemsForProduct(items, itemUuid)}</WrapperItems>;
    }
}
