import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Navigation from '../components/Navigation';
import {userLogIn} from './redux';

const Users = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('Products');
    }
  }, [navigation, loggedIn]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <Navigation />
      <View contentInsetAdjustmentBehavior="automatic">
        <View style={styles.wrap}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            multiline={false}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'username'}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            multiline={false}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'password'}
            secureTextEntry={true}
          />
          <Button
            style={styles.button}
            title={'Submit'}
            onPress={() => {
              dispatch(userLogIn({username, password}));
              if (loggedIn) {
                navigation.navigate('Products');
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 80,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    fontSize: 20,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
});

export default Users;
