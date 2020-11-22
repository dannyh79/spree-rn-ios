import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import {productsIndex} from './redux';

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
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.body}>
            {products.map((product) => (
              <View key={product.id} style={styles.itemWrap}>
                <Text style={styles.itemTitle}>{product.name}</Text>
                <Text style={styles.itemDescription}>
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
  body: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemWrap: {
    flex: 0.5,
    minWidth: 150,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 6,
    marginHorizontal: 6,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  itemDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#333333',
  },
});

export default Products;
