// import React from 'react';
// import {
//   SafeAreaView,
//   TextInput,
//   Text,
//   View,
//   StyleSheet,
//   Button,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as yup from 'yup';

// const loginValidationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Please enter valid email')
//     .required('Email Address is Required'),
//   password: yup
//     .string()
//     .min(8, ({min}) => `Password must be at least ${min} characters`)
//     .required('Password is required'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords do not match')
//     .required('Confirm password is required'),
//   phoneNumber: yup
//     .number()
//     .min(3, () => 'Phone Number must be at least 8 characters')
//     // .lessThan(10, () => 'Phone Number must be less 10 characters long')
//     .typeError('Phone Number must contain number only')
//     .required('Phone Number is required'),
// });

// const App = () => {
//   return (
//     <SafeAreaView>
//       <Formik
//         validationSchema={loginValidationSchema}
//         initialValues={{
//           email: '',
//           password: '',
//           confirmPassword: '',
//           phoneNumber: '',
//         }}
//         onSubmit={(values, {setSubmitting, resetForm}) => {
//           console.log('values :- ', values);
//           console.log('resetForm :- ', resetForm());
//           console.log('Set Submitting :- ', setSubmitting(false));
//         }}>
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isValid,
//         }) => (
//           <View>
//             <Text>{'Email'}</Text>
//             <TextInput
//               placeholder="Email Address"
//               style={styles.inputContainer}
//               value={values.email}
//               onBlur={handleBlur('email')}
//               onChangeText={handleChange('email')}
//             />
//             <Text>{errors.email && touched.email && errors.email}</Text>
//             <Text>{'Password'}</Text>
//             <TextInput
//               placeholder="Password"
//               style={styles.inputContainer}
//               value={values.password}
//               onBlur={handleBlur('password')}
//               onChangeText={handleChange('password')}
//             />
//             <Text>
//               {errors.password && touched.password && errors.password}
//             </Text>
//             <Text>{'Confirm Password'}</Text>
//             <TextInput
//               placeholder="Confirm Password"
//               style={styles.inputContainer}
//               value={values.confirmPassword}
//               onBlur={handleBlur('confirmPassword')}
//               onChangeText={handleChange('confirmPassword')}
//             />
//             <Text>
//               {errors.confirmPassword &&
//                 touched.confirmPassword &&
//                 errors.confirmPassword}
//             </Text>
//             <Text>{'Phone Number'}</Text>
//             <TextInput
//               placeholder="Phone Number"
//               style={styles.inputContainer}
//               value={values.phoneNumber}
//               onBlur={handleBlur('phoneNumber')}
//               onChangeText={handleChange('phoneNumber')}
//             />
//             <Text>
//               {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
//             </Text>
//             <Button disabled={!isValid} title="Submit" onPress={handleSubmit} />
//           </View>
//         )}
//       </Formik>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     borderWidth: 1,
//     width: '80%',
//     marginVertical: 10,
//     alignSelf: 'center',
//     padding: 10,
//   },
// });

// export default App;
