import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormLogin from '../../components/FormLogin';
import Logo from '../../assets/img/bee-logo-admin.svg';
import AuthApiService from '../../services/api/AuthApiService';
import { loginAdmin } from '../../services/validation/auth';

function Login() {
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function authLogin(email, password) {
    setError('');
    try {
      setLoading(true);
      const response = await AuthApiService.sendLoginAdmin({ email, password });
      loginAdmin(response.data.access_token);
      history.push('/admin/home');
    } catch (e) {
      console.log(e);
      setError('Houve um problema com o login, verifique suas credenciais.');
      setLoading(false);
    }
  }

  return (
    <FormLogin image={Logo} authLogin={authLogin} error={error} loading={loading} />
  );
}

export default Login;
