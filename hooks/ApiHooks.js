import {useContext, useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {appID, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

const useMedia = (ownFiles) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update, user} = useContext(MainContext);

  useEffect(() => {
    // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
    (async () => {
      setMediaArray(await loadMedia());
      // console.log('useMedia useEffect', mediaArray);
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      let mediaIlmanThumbnailia = await useTag().getFilesByTag(appID);

      if (ownFiles) {
        mediaIlmanThumbnailia = mediaIlmanThumbnailia.filter(
          (item) => item.user_id === user.user_id
        );
      }

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

  const uploadMedia = async (formData, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formData,
      };
      const result = await doFetch(baseUrl + 'media', options);
      return result;
    } catch (e) {
      console.log('uploadMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyMedia = async (data, token, id) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('modifyMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('deleteMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    mediaArray,
    loading,
    loadMedia,
    loadSingleMedia,
    uploadMedia,
    deleteMedia,
    modifyMedia,
  };
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
    const registerInputs = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      full_Name: inputs.full_name,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerInputs),
    };
    try {
      const registerResponse = await doFetch(baseUrl + 'users', fetchOptions);
      return registerResponse;
    } catch (error) {
      console.log('register error', error.message);
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

  const getUserInfo = async (userid, token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/' + userid, options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  return {checkToken, register, checkUsernameAvailable, getUserInfo};
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
  // eslint-disable-next-line camelcase
  const addTag = async (file_id, tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id, tag}),
    };
    try {
      const tagInfo = await doFetch(baseUrl + 'tags', options);
      return tagInfo;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {getFilesByTag, addTag};
};

export {useMedia, useLogin, useUser, useTag};
