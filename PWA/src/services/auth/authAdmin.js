import nJwt from 'njwt';

export const TOKEN_KEY = '@admin-Token';
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

export const loginAdmin = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
