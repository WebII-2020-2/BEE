import nJwt from 'njwt';
import api from '../api/api';

export const TOKEN_KEY = '@user-Token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);

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

export const loginUser = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
