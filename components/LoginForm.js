import React from 'react';
import PropTypes from 'prop-types';
import {Button, View} from 'react-native';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = ({navigation}) => {
  const {handleInputChange, inputs} = useLoginForm();
  const {setIsLoggedIn} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      console.log('dologin response', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO : Save user info(loginInfo.user) to maincontext
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error.message);
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
