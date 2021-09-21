import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import {Button, Input} from 'react-native-elements';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      await AsyncStorage.setItem('userToken', loginInfo.token);
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error);
    }
  };

  return (
    <View>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
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
