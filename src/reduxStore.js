import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import products from './products/redux';
import user from './user/redux';

const store = createStore(
  combineReducers({products, user}),
  applyMiddleware(thunk),
);

export default store;
