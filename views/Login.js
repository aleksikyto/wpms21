import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {Card, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        setUser(userInfo);
        setIsLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      {registerFormToggle ? (
        <Card>
          <Text h2 style={{textAlign: 'center'}}>
            Register
          </Text>
          <RegisterForm navigation={navigation} />
        </Card>
      ) : (
        <Card>
          <Text h2 style={{textAlign: 'center'}}>
            Login
          </Text>
          <LoginForm navigation={navigation} />
        </Card>
      )}
      <Text
        style={{textAlign: 'center', color: 'blue', marginTop: 20}}
        onPress={() => {
          setRegisterFormToggle(!registerFormToggle);
        }}
      >
        {registerFormToggle
          ? 'Already registered? Login.'
          : 'Not registered yet?  \nCreate new account'}
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
