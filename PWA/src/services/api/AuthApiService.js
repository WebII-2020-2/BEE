import api from './api';

function sendLoginAdmin(dados) {
  return api.post('/login', {
    ...dados,
  });
}

const AuthApiService = {
  sendLoginAdmin,
};

export default AuthApiService;
