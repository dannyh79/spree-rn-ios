/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider} from 'react-redux';
import store from './reduxStore';

import ProductsView from './products';

const App = () => {
  return (
    <Provider store={store}>
      <ProductsView />
    </Provider>
  );
};

export default App;
