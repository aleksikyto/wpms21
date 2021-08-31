import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {checkToken} = useUser();

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
      <LoginForm navigation={navigation} />
      <RegisterForm navigation={navigation} />
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
