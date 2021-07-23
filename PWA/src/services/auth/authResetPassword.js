import nJwt from 'njwt';

const isAuthenticated = (token) => {
  try {
    return nJwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  } catch ({ message }) {
    if (message === 'Jwt not active') {
      return true;
    }
    console.error(`TOKEN-ERROR: ${message}`);
    return false;
  }
};

export default isAuthenticated;
