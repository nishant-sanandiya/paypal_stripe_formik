import React from 'react';
import {
  TextInput,
  Text,
  Platform,
  View,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import KeyboardManager from 'react-native-keyboard-manager';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(30);
}

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  phoneNumber: yup
    .number()
    .test('len', 'Must be less than 10 characters', val =>
      val ? !(val?.toString()?.length > 10) : undefined,
    )
    .test('len', 'Must be greater than 6 characters', val =>
      val ? !(val?.toString()?.length <= 6) : undefined,
    )
    .typeError('Phone Number must contain number only')
    .required('Phone Number is required'),
});

export const Form = () => {
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
      }}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        console.log('values :- ', values);
        resetForm();
        setSubmitting(false);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
      }) => (
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.mainView}>
            <Text style={styles.titleTextStyle}>{'Email'}</Text>
            <TextInput
              placeholder="Email Address"
              style={styles.inputContainer}
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
            />
            <Text style={styles.errorTextStyle}>
              {errors.email && touched.email && errors.email}
            </Text>
            <Text style={styles.titleTextStyle}>{'Password'}</Text>
            <TextInput
              placeholder="Password"
              style={styles.inputContainer}
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
            />
            <Text style={styles.errorTextStyle}>
              {errors.password && touched.password && errors.password}
            </Text>
            <Text style={styles.titleTextStyle}>{'Confirm Password'}</Text>
            <TextInput
              placeholder="Confirm Password"
              style={styles.inputContainer}
              value={values.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
            />
            <Text style={styles.errorTextStyle}>
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
            </Text>
            <Text style={styles.titleTextStyle}>{'Phone Number'}</Text>
            <TextInput
              placeholder="Phone Number"
              style={styles.inputContainer}
              value={values.phoneNumber}
              onBlur={handleBlur('phoneNumber')}
              onChangeText={handleChange('phoneNumber')}
            />
            <Text style={{...styles.errorTextStyle, marginBottom: 35}}>
              {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            </Text>
            <Button disabled={!isValid} title="Submit" onPress={handleSubmit} />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  mainView: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  titleTextStyle: {
    marginTop: 25,
  },
  errorTextStyle: {
    color: 'red',
  },
  scrollViewStyle: {
    flex: 1,
    width: '90%',
  },
});
