import React from 'react';
import PropTypes from 'prop-types';
import {View, Alert} from 'react-native';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';
import {Button, Input} from 'react-native-elements';

const RegisterForm = ({navigation}) => {
  const {inputs, handleInputChange, checkUsername, errors, handleOnEndEditing} =
    useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    const serverResponse = await register(JSON.stringify(inputs));
    console.log('registerform - doRegister', serverResponse);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('Registration failed.');
    }
  };

  return (
    <View>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          checkUsername(event.nativeEvent.text);
          handleOnEndEditing('username', event.nativeEvent.text);
        }}
        errorMessage={errors.username}
      />
       <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('password', event.nativeEvent.text);
        }}
        errorMessage={errors.password}
      />
      <Input
        autoCapitalize="none"
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('confirmPassword', event.nativeEvent.text);
        }}
        errorMessage={errors.confirmPassword}
      />
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('email', event.nativeEvent.text);
        }}
        errorMessage={errors.email}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('full_name', event.nativeEvent.text);
        }}
        errorMessage={errors.full_name}
      />
      <Button
        title="Register!"
        onPress={doRegister}
        disabled={errors.username || errors.password || errors.email}
      />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
