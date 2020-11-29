import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Button, View, Alert, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {logOut} from '../user/redux';

const NavButton = ({name, route, navigation}) => {
  if (route.name === name) {
    return null;
  }

  return <Button title={name} onPress={() => navigation.navigate(name)} />;
};

const Navigation = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const baseProps = {route: route, navigation: navigation};
  const productProps = {...baseProps, name: 'Products'};
  const logInProps = {...baseProps, name: 'Log In'};

  return (
    <View style={styles.navigation}>
      <NavButton {...productProps} />
      <NavButton {...logInProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAAAA',
    borderBottomWidth: 4,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export default Navigation;
