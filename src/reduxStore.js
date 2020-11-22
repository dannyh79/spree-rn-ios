import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(combineReducers(), compose(applyMiddleware(thunk)));

export default store;
