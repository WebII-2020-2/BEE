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

const LogonApiService = {
  login,
  register,
};

export default LogonApiService;
