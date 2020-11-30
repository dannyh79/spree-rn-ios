/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider} from 'react-redux';
import {store} from './reduxStore';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductsView from './products';
import UserView from './user';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products" component={ProductsView} />
          <Stack.Screen name="Log In" component={UserView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
