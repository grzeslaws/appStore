import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { OrderItem } from "../../../model/orderItem";
import { Product } from "../../../model/Product";
import PublicNavigationWrapper from "../../../wrappers/PublicNavigationWrapper";

export interface CartProps {
    i18n: Immutable<I18N>;
    orderItems: ReadonlyArray<Immutable<OrderItem>>;
}
interface CartState {
    tempProducts: any[];
}

export class CartComponent extends React.Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);

        this.state = {
            tempProducts: [
                {
                    product: {
                        id: 200,
                        imagePath: "default.jpg",
                        name: "Product 199",
                        price: 1990,
                        productUuid: "5632631f-b13b-483c-b1bb-4a71b146b371",
                    },
                    quantity: 2,
                },
                {
                    product: {
                        id: 200,
                        imagePath: "default.jpg",
                        name: "Product 199",
                        price: 1990,
                        productUuid: "5632631f-b13b-483c-b1bb-4a71b146b371",
                    },
                    quantity: 6,
                },
                {
                    product: {
                        id: 200,
                        imagePath: "default.jpg",
                        name: "Product 199",
                        price: 1990,
                        productUuid: "5632631f-b13b-483c-b1bb-4a71b146b371",
                    },
                    quantity: 0,
                },
                {
                    product: {
                        id: 197,
                        imagePath: "default.jpg",
                        name: "Product 196",
                        price: 1960,
                        productUuid: "ab3ee750-306e-4276-84e0-94b5be0dab8c",
                    },
                    quantity: 2,
                },
                {
                    product: {
                        id: 197,
                        imagePath: "default.jpg",
                        name: "Product 196",
                        price: 1960,
                        productUuid: "ab3ee750-306e-4276-84e0-94b5be0dab8c",
                    },
                    quantity: 0,
                },
                {
                    product: {
                        id: 197,
                        imagePath: "default.jpg",
                        name: "Product 196",
                        price: 1960,
                        productUuid: "ab3ee750-306e-4276-84e0-94b5be0dab8c",
                    },
                    quantity: 2,
                },
                {
                    product: {
                        id: 197,
                        imagePath: "default.jpg",
                        name: "Product 196",
                        price: 1960,
                        productUuid: "ab3ee750-306e-4276-84e0-94b5be0dab8c",
                    },
                    quantity: 4,
                },
                {
                    product: {
                        id: 196,
                        imagePath: "default.jpg",
                        name: "Product 195",
                        price: 1950,
                        productUuid: "cc5574ea-2364-45c0-a861-4ccacaf0a53b",
                    },
                    quantity: 1,
                },
            ],
        };
    }

    public render() {
        const { orderItems } = this.props;
        const orderList = orderItems
            ? orderItems.map((p, i) => {
                  return (
                      <div key={i}>
                          Product quantity: {p.quantity}, Name: {p.product ? p.product.name : ""}
                      </div>
                  );
              })
            : null;
        return (
            <>
                <PublicNavigationWrapper />
                {orderList}
                {/* Cart component {this.renderProductList(this.state.tempProducts)} */}
                <br />
                Total payment:
            </>
        );
    }

    // private renderProductList(products: ReadonlyArray<Immutable<Product>>) {
    //     const editableProductList = [...products];
    //     const productList: Product[] = [editableProductList[0]];
    //     console.log(productList);
    //     for (const product of editableProductList) {
    //         const isDuplicate = productList.find(p => p.productUuid === product.productUuid);

    //         if (!isDuplicate) {
    //             productList.push(product);
    //         } else {
    //             isDuplicate.quantity++;
    //         }
    //     }
    // }
}
