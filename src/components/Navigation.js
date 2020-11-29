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

const renderLogButtons = ({loggedIn, logInButton, logOutButton}) => {
  if (loggedIn) {
    return logOutButton;
  } else {
    return logInButton;
  }
};

const Navigation = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  const baseProps = {route: route, navigation: navigation};
  const productProps = {...baseProps, name: 'Products'};
  const logInProps = {...baseProps, name: 'Log In'};
  const ordersProps = {...baseProps, name: 'Orders'};

  const handleLogOut = useCallback(() => {
    Alert.alert('Log out Successfully!');
    dispatch(logOut());
    navigation.navigate('Log In');
  }, [dispatch, navigation]);

  return (
    <View style={styles.navigation}>
      <NavButton {...productProps} />
      {loggedIn && <NavButton {...ordersProps} />}
      {renderLogButtons({
        loggedIn,
        logInButton: <NavButton {...logInProps} />,
        logOutButton: (
          <Button title={'Log Out'} onPress={() => handleLogOut()} />
        ),
      })}
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
