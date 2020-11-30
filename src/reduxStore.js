import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import products from './products/redux';
import user from './user/redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const store = createStore(
  persistReducer(persistConfig, combineReducers({products, user})),
  applyMiddleware(thunk),
);

const persistor = persistStore(store);

export {persistor, store};
