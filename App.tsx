import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {Paypal, StripeHome} from './src/components/index';
import {
  merchantIdentifier,
  publishableKey,
  your_url_scheme,
} from './src/constants';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StripeProvider
        publishableKey={publishableKey}
        urlScheme={your_url_scheme} // required for 3D Secure and bank redirects
        merchantIdentifier={merchantIdentifier} // required for Apple Pay
      >
        <StripeHome />
        <Paypal />
        {/* <StripeCard /> */}
      </StripeProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
