import { Immutable } from "immutable-typescript";
import { parse } from "sparkson";
import { OrderItem } from "src/model/OrderItem";
import endpoints from "../../endpoints";
import http from "../../http";
import { OrderItemSpark } from "../../model/OrderItemSpark";
import { Product } from "../../model/Product";
import { AccessToken } from "./../../model/AccessToken";
import { Order } from "./../../model/Order";
import { Action } from "./action";

import * as $ from "jquery";

interface OrderUuid {
    orderUuid: string;
}

export function addProductToCart(product: Product): Action<"ADD_PRODUCT_TO_CART", Product> {
    return {
        type: "ADD_PRODUCT_TO_CART",
        payload: product,
    };
}

export function removeProductFromCart(product: Product): Action<"REMOVE_PRODUCT_FROM_CART", Product> {
    return {
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: product,
    };
}

function updateOrder(order: Order): Action<"UPDATE_ORDER", Order> {
    return {
        type: "UPDATE_ORDER",
        payload: order,
    };
}

export function createOrderAction(orderItems: ReadonlyArray<Immutable<OrderItem>>) {
    return dispatch => {
        return http(endpoints.createOrder, "post", { orderItems }).then((json: OrderUuid) => {
            console.log(json.orderUuid);

            dispatch(getOrderAction(json.orderUuid));
        });
    };
}

export function getOrderAction(orderUuid: string) {
    return dispatch => {
        return http(endpoints.getOrder(orderUuid), "get", {}).then((json: Order) => {
            dispatch(updateOrder(parse(Order, json)));
            http(endpoints.getAccessToken, "get", {}).then((accessToken: AccessToken) => {
                // tslint:disable-next-line:no-string-literal
            });
        });
    };
}

// export function sendOrder() {
//     const request = new XMLHttpRequest();

//     request.open("POST", "https://secure.payu.com/pl/standard/user/oauth/authorize");

//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//     request.onreadystatechange = function() {
//         if (this.readyState === 4) {
//             console.log("Status:", this.status);
//             console.log("Headers:", this.getAllResponseHeaders());
//             console.log("Body:", this.responseText);
//         }
//     };

//     const body = "grant_type=client_credentials&client_id=145227&client_secret=12f071174cb7eb79d4aac5bc2f07563f";
//     console.log(request.send(body));
//     request.send(body);
// }

// export function sendOrder() {
//     const url = "https://secure.payu.com/api/v2_1/orders/";
//     const request = new XMLHttpRequest();

//     if ("withCredentials" in request) {

//         request.open("POST", url);

//         request.setRequestHeader("Content-Type", "application/json");
//         request.setRequestHeader("Authorization", "Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd");
//         request.setRequestHeader("Access-Control-Allow-Origin", "*");

//         request.onreadystatechange = function() {
//             if (this.readyState === 4) {
//                 console.log("Status:", this.status);
//                 console.log("Headers:", this.getAllResponseHeaders());
//                 console.log("Body:", this.responseText);
//             }
//         };

//         const body = {
//             notifyUrl: "https://your.eshop.com/notify",
//             customerIp: "127.0.0.1",
//             merchantPosId: "145227",
//             description: "RTV market",
//             currencyCode: "PLN",
//             totalAmount: "21000",
//             products: [
//                 {
//                     name: "Wireless mouse",
//                     unitPrice: "15000",
//                     quantity: "1",
//                 },
//                 {
//                     name: "HDMI cable",
//                     unitPrice: "6000",
//                     quantity: "1",
//                 },
//             ],
//         };

//         request.send(JSON.stringify(body));
//     } else {
//         // CORS not supported
//     }
// }

// export function sendOrder() {
//     const settings = {
//         async: true,
//         crossDomain: true,
//         url: "https://secure.payu.com/api/v2_1/orders/",
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd",
//             "Cache-Control": "no-cache",
//             "Postman-Token": "7d5e665c-cd77-41f4-a18e-1f15bc93cc8c",
//             "Access-Control-Allow-Origin": "*",
//         },
//         processData: false,
//         data:
//             // tslint:disable-next-line:max-line-length
//             "{\n    "notifyUrl": "https://your.eshop.com/notify",\n    "customerIp": "127.0.0.1",\n    "merchantPosId": "145227",\n    "description": "RTV market",\n    "currencyCode": "PLN",\n    "totalAmount": "21000",\n    "products": [\n      {\n        "name": "Wireless mouse",\n        "unitPrice": "15000",\n        "quantity": "1"\n      },\n      {\n        "name": "HDMI cable",\n        "unitPrice": "6000",\n        "quantity": "1"\n      }\n    ]\n  }",
//     };

//     $.ajax(settings).done(response => {
//         console.log(response);
//     });
// }

export function sendOrder() {
    const body = {
        notifyUrl: "https://your.eshop.com/notify",
        customerIp: "127.0.0.1",
        merchantPosId: "145227",
        description: "RTV market",
        currencyCode: "PLN",
        totalAmount: "21000",
        products: [
            {
                name: "Wireless mouse",
                unitPrice: "15000",
                quantity: "1",
            },
            {
                name: "HDMI cable",
                unitPrice: "6000",
                quantity: "1",
            },
        ],
    };
    fetch("https://secure.payu.com/api/v2_1/orders/", {
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
        credentials: "same-origin",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": "Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd",
        },
        body: JSON.stringify(body),
    }).then(response => response.json());
}
