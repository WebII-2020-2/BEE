import api from './api';

function login(form) {
  return api.post('/login', {
    ...form,
  });
}

function register(form) {
  return api.post('/register', {
    ...form,
  });
}

function forgotPassword(email) {
  return api.post('/forgot/password', {
    ...email,
  });
}

function resetPassword(form) {
  return api.post('/reset/password', {
    ...form,
  });
}

function getUser() {
  return api.post('/get');
}

const LogonApiService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  getUser,
};

export default LogonApiService;
