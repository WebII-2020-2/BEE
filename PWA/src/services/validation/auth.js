import { verify } from 'jsonwebtoken';

export const TOKEN_KEY = '@admin-Token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => {
  let isValid = false;
  verify(getToken(), process.env.REACT_APP_JWT_SECRET, ((err) => {
    isValid = !err;
    console.log(err);
  }));
  return isValid;
};

export const loginAdmin = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
