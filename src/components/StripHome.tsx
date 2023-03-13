import axios from 'axios';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, Button, Linking, View} from 'react-native';
import {ApiURL, merchantIdentifier} from '../constants/index';
import {
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
  usePlatformPay,
  PlatformPay,
  confirmPlatformPayPayment,
} from '@stripe/stripe-react-native';

export const StripeHome = memo(() => {
  const {isPlatformPaySupported} = usePlatformPay();
  const {handleURLCallback} = useStripe();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({googlePay: {testEnv: true}}))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, [isPlatformPaySupported]);

  const onPayPressHandler = useCallback(async () => {
    try {
      setLoader(true);
      const response = await axios.post(ApiURL);
      const data = response.data;
      const responseInitPaymentSheet = await initPaymentSheet({
        merchantDisplayName: merchantIdentifier,
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        // customFlow: true,
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

  const onGpayPressHandler = useCallback(async () => {
    try {
      setLoader(true);
      const response = await axios.post(ApiURL);
      const data = response.data;
      const responseInitPaymentSheet = await initPaymentSheet({
        merchantDisplayName: merchantIdentifier,
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        customFlow: true,
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
      const responseConfirmPlatformPayPayment = await confirmPlatformPayPayment(
        'sk_test_tR3PYbcVNZZ796tH88S4VQ2u',
        {
          googlePay: {
            testEnv: true,
            merchantName: 'My merchant name',
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            billingAddressConfig: {
              format: PlatformPay.BillingAddressFormat.Full,
              isPhoneNumberRequired: true,
              isRequired: true,
            },
          },
        },
      );
      console.log(
        'responseConfirmPlatformPayPayment :- ',
        responseConfirmPlatformPayPayment,
      );
      if (!responseConfirmPlatformPayPayment.error) {
        // const response = await confirmPaymentSheetPayment();
        // console.log('Response :- ', response);
        Alert.alert('Payment Done Successfully', '', [
          {text: 'OK', onPress: () => {}},
        ]);
      } else {
        throw new Error(responseConfirmPlatformPayPayment.error.message);
      }
    } catch (err) {
      Alert.alert('Payment Failed', '', [{text: 'OK', onPress: () => {}}]);
      console.log('Error in order create :- ', JSON.stringify(err));
    } finally {
      setLoader(false);
    }
  }, []);

  return (
    <View>
      <Button disabled={loader} title="Pay" onPress={onPayPressHandler} />
      {/* <Button disabled={loader} title="GPay" onPress={onGpayPressHandler} /> */}
    </View>
  );
});
