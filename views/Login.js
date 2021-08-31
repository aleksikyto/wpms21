import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {login} = useLogin();
  const {checkToken} = useUser();

  const doLogin = async () => {
    try {
      const loginInfo = await login(
        JSON.stringify({
          username: 'alesikyto',
          password: '1234',
        })
      );
      console.log('dologin response', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO : Save user info(loginInfo.user) to maincontext
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error.message);
    }
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        // TODO : save user info to maincontext
        setIsLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={doLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
