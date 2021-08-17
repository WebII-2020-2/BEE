import nJwt from 'njwt';
import api from '../api/api';
import LogonApiService from '../api/LogonApiService';
import { ADMIN_STORAGE_KEY, CART_STORAGE_KEY, USER_STORAGE_KEY } from './keys';

export const getUserData = () => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  return JSON.parse(userData);
};

export const getToken = () => {
  const userData = getUserData();
  if (userData) return userData.token;
  return null;
};

export const isAuthenticated = () => {
  try {
    return nJwt.verify(getToken(), process.env.REACT_APP_JWT_SECRET);
  } catch ({ message }) {
    if (message === 'Jwt not active') {
      return true;
    }
    console.error(`TOKEN-ERROR: ${message}`);
    return false;
  }
};

export const loginUser = (userData) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  localStorage.removeItem(ADMIN_STORAGE_KEY);
};

export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const updateUser = async () => {
  try {
    const resp = await LogonApiService.getUser()
      .then((r) => r.data)
      .catch((r) => {
        throw r.response.data.error;
      });
    loginUser({
      token: getToken(),
      ...resp.data,
      name: resp.data.name.split(' ', 1)[0],
    });
  } catch (err) {
    console.error(`ERRO ${err.code}: ${err.error_message}`);
  }
};

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
