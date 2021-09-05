import React from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  console.log('profile', isLoggedIn);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>{user.username}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
