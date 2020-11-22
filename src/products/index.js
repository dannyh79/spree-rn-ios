import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {productsIndex} from './redux';

const Header = () => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('../../assets/logo.jpg')}
    style={headerStyles.background}
    imageStyle={headerStyles.logo}>
    <Text style={headerStyles.text}>SpreeExample</Text>
  </ImageBackground>
);

const headerStyles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.15,
    overflow: 'visible',
    resizeMode: 'cover',
    marginLeft: -96,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
});

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsIndex());
  }, [dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            {products.map((product) => (
              <View key={product.id} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{product.name}</Text>
                <Text style={styles.sectionDescription}>
                  {product.description}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Products;
