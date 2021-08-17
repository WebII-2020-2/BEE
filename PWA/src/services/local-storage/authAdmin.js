import nJwt from 'njwt';
import api from '../api/api';
import LogonApiService from '../api/LogonApiService';
import { ADMIN_STORAGE_KEY, USER_STORAGE_KEY } from './keys';

export const getAdminData = () => {
  const adminData = localStorage.getItem(ADMIN_STORAGE_KEY);
  return JSON.parse(adminData);
};

export const getToken = () => {
  const adminData = getAdminData();
  if (adminData) return adminData.token;
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

export const loginAdmin = (adminData) => {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const logout = () => {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
};

export const updateUser = async () => {
  try {
    const resp = await LogonApiService.getUser()
      .then((r) => r.data)
      .catch((r) => {
        throw r.response.data.error;
      });
    loginAdmin({ token: getToken(), ...resp.data });
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
