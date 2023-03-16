import axios from 'axios';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';
import {
  StripeOrderURL,
  merchantIdentifier,
  your_url_scheme,
} from '../constants/index';
import {
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
} from '@stripe/stripe-react-native';

export const StripeHome = memo(() => {
  const {handleURLCallback} = useStripe();

  const [loader, setLoader] = useState(false);

  const onPayPressHandler = useCallback(async () => {
    try {
      setLoader(true);
      const response = await axios.post(StripeOrderURL);
      const data = response.data;
      const responseInitPaymentSheet = await initPaymentSheet({
        merchantDisplayName: merchantIdentifier,
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        // customFlow: true,
        returnURL: your_url_scheme,
        defaultBillingDetails: {
          name: 'Jane Doe',
          address: {
            country: 'US',
          },
        },
        applePay: {
          merchantCountryCode: 'US',
        },
        googlePay: {
          currencyCode: 'USD',
          merchantCountryCode: 'US',
          testEnv: true,
        },
        style: 'automatic',
      });
      console.log('responseInitPaymentSheet :- ', responseInitPaymentSheet);
      // const responseConfirmPaymentSheet = await confirmPaymentSheetPayment();
      // console.log(
      //   'responseConfirmPaymentSheet :- ',
      //   responseConfirmPaymentSheet,
      // );
      const responsePresentPaymentSheet = await presentPaymentSheet({
        timeout: 600000,
      });
      console.log(
        'responsePresentPaymentSheet :- ',
        responsePresentPaymentSheet,
      );
      if (!responsePresentPaymentSheet.error) {
        // const response = await confirmPaymentSheetPayment();
        // console.log('Response :- ', response);
        Alert.alert('Payment Done Successfully', '', [
          {text: 'OK', onPress: () => {}},
        ]);
      } else {
        throw new Error(responsePresentPaymentSheet.error.message);
      }
    } catch (err) {
      Alert.alert('Payment Failed', '', [{text: 'OK', onPress: () => {}}]);
      console.log('Error in order create :- ', JSON.stringify(err));
    } finally {
      setLoader(false);
    }
  }, []);

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: {url: string}) => {
        handleDeepLink(event.url);
      },
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <View style={styles.mainView}>
      <Button
        disabled={loader}
        title="Pay With Stripe"
        onPress={onPayPressHandler}
      />
      {/* <Button disabled={loader} title="GPay" onPress={onGpayPressHandler} /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
