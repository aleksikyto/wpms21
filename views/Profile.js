import React, {useState, useEffect} from 'react';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text, Button, Image} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400');

  const {getFilesByTag} = useTag();

  useEffect(() => {
    (async () => {
      const file = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(uploadsUrl + file[0].filename);
    })();
  }, [user]);

  console.log('profile', isLoggedIn);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <Card>
      <Card.Title>Username: {user.username}</Card.Title>
      <Card.Divider />
      <Image style={{width: 300, height: 300}} source={{uri: avatar}} />
      <Card.Divider />
      <Text>Fullname: {user.full_name}</Text>
      <Text style={{marginBottom: 20}}>Email: {user.email}</Text>
      <Card.Divider />
      <Button title={'Logout'} onPress={logout} />
    </Card>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
