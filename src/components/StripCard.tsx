import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';

export const StripeCard = memo(() => {
  return (
    <>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={
          {
            //   backgroundColor: 'pink',
            //   textColor: 'pink',
          }
        }
        style={{
          width: '100%',
          height: 300,
          backgroundColor: 'pink',
          marginVertical: 30,
        }}
        onCardChange={(cardDetails: any) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField: any) => {
          console.log('focusField', focusedField);
        }}
      />
    </>
  );
});

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
