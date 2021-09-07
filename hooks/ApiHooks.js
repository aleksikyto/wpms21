import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbnailia = await doFetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia', e.message);
      return {};
    }
  };

  return {mediaArray, loadMedia, loadSingleMedia};
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: userCredentials,
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login', requestOptions);
      return loginResponse;
    } catch (error) {
      console.log('login error', error.message);
    }
  };
  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputs,
    };
    try {
      const response = await fetch(baseUrl + 'users', fetchOptions);
      const json = await response.json();
      return json;
    } catch (e) {
      console.log('ApiHooks register', e.message);
      return false;
    }
  };

  const checkUsernameAvailable = async (username) => {
    try {
      const usernameInfo = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return usernameInfo.available;
    } catch (error) {
      console.log('checkUsername error', error);
    }
  };

  return {checkToken, register, checkUsernameAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const avatar = await doFetch(baseUrl + 'tags/' + tag);
      return avatar;
    } catch (e) {
      console.log('useTag', e.message);
      return {};
    }
  };
  return {getFilesByTag};
};

export {useMedia, useLogin, useUser, useTag};
