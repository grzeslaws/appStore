import { Immutable } from "immutable-typescript";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

import adminProfileReducer from "../reducers/adminProfileReducer";
import cartReducer from "../reducers/cartReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import collectionsReducer from "../reducers/collectionsReducer";
import i18nReducer from "../reducers/i18nReducer";
import productsReducer from "../reducers/productsReducer";

import AdminProfileStore from "./adminProfileStore";
import CartStore from "./cartStore";
import CategoriesStore from "./categoriesStore";
import CollectionsStore from "./collectionsStore";
import I18NStore from "./i18nStore";
import ProductsStore from "./productsStore";

const middleware =  applyMiddleware(thunk, createLogger());
const reducers = combineReducers({
    i18n: i18nReducer,
    products: productsReducer,
    adminProfile: adminProfileReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    collections: collectionsReducer,
});

export interface ApplicationStore {
    i18n: I18NStore;
    products: ProductsStore;
    adminProfile: AdminProfileStore;
    cart: CartStore;
    categories: CategoriesStore;
    collections: CollectionsStore;
}

export default createStore(reducers, middleware) as Store<Immutable<ApplicationStore>>;
