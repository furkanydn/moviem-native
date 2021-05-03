import {applyMiddleware,createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from "redux-persist";
import createSagaMiddleware from 'redux-saga';
//
import {reactotron} from "../config/reactotron";
import {rootReducer} from "./reducer";
import {afterRehyd} from "./rehydrate/action";
import {rootSa}
