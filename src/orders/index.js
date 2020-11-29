import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import Navigation from '../components/Navigation';

import {completedOrdersListReq} from '../spree/api';

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 80,
  },
  order: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    borderWidth: 4,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
  },
});

const Orders = () => {
  const token = useSelector((state) => state.user.bearerToken);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted && token) {
      (async () => {
        const result = await completedOrdersListReq(token);
        setOrders(() => [...result]);
      })();
    }

    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <SafeAreaView>
      <Navigation />
      <View contentInsetAdjustmentBehavior="automatic">
        <View style={styles.wrap}>
          {orders.map(({number, completedAt, status, displayTotal}) => (
            <View key={number} style={styles.order}>
              <Text>
                {number} ({completedAt})
              </Text>
              <Text>Status: {status}</Text>
              <Text>{displayTotal}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
