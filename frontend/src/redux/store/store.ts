import { Immutable } from "immutable-typescript";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

import i18nReducer from "../reducers/i18nReducer";
import productsReducer from "../reducers/productsReducer";

import I18NStore from "./i18nStore";
import ProductsStore from "./productsStore";

const middleware =  applyMiddleware(thunk, createLogger());
const reducers = combineReducers({
    i18n: i18nReducer,
    products: productsReducer,
});

export interface ApplicationStore {
    i18n: I18NStore;
    products: ProductsStore;
}

export default createStore(reducers, middleware) as Store<Immutable<ApplicationStore>>;