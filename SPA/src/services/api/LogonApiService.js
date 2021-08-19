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

function updateUser(form) {
  return api.post('/user/update', {
    ...form,
  });
}

function changePassword(form) {
  return api.post('/change/password', {
    ...form,
  });
}

function deleteUser() {
  return api.post('/delete');
}

const LogonApiService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  changePassword,
  deleteUser,
};

export default LogonApiService;
