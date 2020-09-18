/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';

import Config from 'react-native-config';
import {makeClient} from '@spree/storefront-api-v2-sdk';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Header = () => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./assets/logo.jpg')}
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

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const client = makeClient({
      host: Config.API_HOST,
    });

    (async () => {
      const productIndexReq = await client.products.list({
        include: 'default_variant',
        page: 1,
        sort: '-updated_at',
      });

      if (productIndexReq.isSuccess) {
        const data = productIndexReq.success().data;
        setProducts(data.map(({id, attributes}) => ({id, ...attributes})));
      }
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            {products.map((product) => (
              <View key={product.id} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{product.name}</Text>
                <Text style={styles.sectionDescription}>
                  {product.description}
                </Text>
              </View>
            ))}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
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
  engine: {
    position: 'absolute',
    right: 0,
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
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
