import { Immutable } from "immutable-typescript";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

import adminProfileReducer from "../reducers/adminProfileReducer";
import cartReducer from "../reducers/cartReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import collectionsReducer from "../reducers/collectionsReducer";
import i18nReducer from "../reducers/i18nReducer";
import messageReducer from "../reducers/messageReducer";
import modalReducer from "../reducers/modalReducer";
import orderReducer from "../reducers/orderReducer";
import postPaymentReducer from "../reducers/postPaymentReducer";
import postStatusReducer from "../reducers/postStatusReducer";
import productsReducer from "../reducers/productsReducer";
import spinnerReducer from "../reducers/spinnerReducer";

import carouselReducer from "../reducers/carouselReducer";
import AdminProfileStore from "./adminProfileStore";
import CarouselStore from "./carouselStore";
import CartStore from "./cartStore";
import CategoriesStore from "./categoriesStore";
import CollectionsStore from "./collectionsStore";
import I18NStore from "./i18nStore";
import MessageStore from "./messageStore";
import ModalStore from "./modalStore";
import OrderStore from "./orderStore";
import PostPaymentStore from "./postPaymentStore";
import PostStatusStore from "./postStatusStore";
import ProductsStore from "./productsStore";
import SpinnerStore from "./spinnerStore";

const middleware =  applyMiddleware(thunk, createLogger());
const reducers = combineReducers({
    i18n: i18nReducer,
    products: productsReducer,
    adminProfile: adminProfileReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    collections: collectionsReducer,
    carousel: carouselReducer,
    messages: messageReducer,
    order: orderReducer,
    postPayment: postPaymentReducer,
    postStatus: postStatusReducer,
    spinner: spinnerReducer,
    modal: modalReducer,
});

export interface ApplicationStore {
    i18n: I18NStore;
    products: ProductsStore;
    adminProfile: AdminProfileStore;
    cart: CartStore;
    categories: CategoriesStore;
    collections: CollectionsStore;
    carousel: CarouselStore;
    messages: MessageStore;
    order: OrderStore;
    postPayment: PostPaymentStore;
    postStatus: PostStatusStore;
    spinner: SpinnerStore;
    modal: ModalStore;
}

export default createStore(reducers, middleware) as Store<Immutable<ApplicationStore>>;
