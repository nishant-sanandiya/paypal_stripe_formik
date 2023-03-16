import React, {memo, useCallback, useState} from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import {
  requestOneTimePayment,
  requestBillingAgreement,
} from 'react-native-paypal';
import {paypalToken} from '../constants';

export const Paypal = memo(() => {
  const [loader, setLoader] = useState(false);

  const onPaypalPressHandler = useCallback(async () => {
    try {
      setLoader(true);
      // const response = await fetch('http://192.168.1.113:3000/token'); // Edit this to point to your server token call
      // const responseParse = await response.json();
      // const token = responseParse?.clientToken || '';
      const token = paypalToken;
      // console.log('token  :- ', token);
      const oneTimePaymentResponse = await requestOneTimePayment(token, {
        amount: '100',
        currency: 'USD',
        intent: 'authorize',
        shippingAddressRequired: false,
        userAction: 'commit',
      });
      Alert.alert('Payment Success', oneTimePaymentResponse?.nonce, [
        {text: 'ok'},
      ]);
      console.log('oneTimePaymentResponse :- ', oneTimePaymentResponse);
    } catch (err: any) {
      Alert.alert('Error', err?.message, [{text: 'ok'}]);
      console.log('Error in paypal handler :- ', err);
    } finally {
      setLoader(false);
    }
  }, []);

  const onPaypalBillingAgreementPressHandler = useCallback(async () => {
    try {
      setLoader(true);
      // const response = await fetch('http://192.168.1.113:3000/token'); // Edit this to point to your server token call
      // const responseParse = await response.json();
      // const token = responseParse?.clientToken || '';
      const token = paypalToken;
      // console.log('token  :- ', token);
      const oneTimePaymentResponse = await requestBillingAgreement(token, {
        billingAgreementDescription: 'Billing Agreement Description',
        currency: 'USD',
      });
      Alert.alert('Payment Success', oneTimePaymentResponse?.nonce, [
        {text: 'ok'},
      ]);
      console.log('oneTimePaymentResponse :- ', oneTimePaymentResponse);
    } catch (err: any) {
      Alert.alert('Error', err?.message, [{text: 'ok'}]);
      console.log('Error in paypal handler :- ', err);
    } finally {
      setLoader(false);
    }
  }, []);

  return (
    <View style={styles.mainView}>
      <Button
        disabled={loader}
        title="Pay With Paypal"
        onPress={onPaypalPressHandler}
      />
      <Button
        disabled={loader}
        title="Pay With Paypal Billing Agreement"
        onPress={onPaypalBillingAgreementPressHandler}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
