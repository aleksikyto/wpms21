import React from 'react';
import PropTypes from 'prop-types';
import {View, Alert} from 'react-native';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';
import {Button, Input} from 'react-native-elements';

const RegisterForm = ({navigation}) => {
  const {inputs, handleInputChange, checkUsername, errors} = useSignUpForm();
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
        }}
        errorMessage={errors.username}
      />
      <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
