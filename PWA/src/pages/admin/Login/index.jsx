import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormLogin from '../../../components/Shared/FormLogin';
import Logo from '../../../assets/img/bee-logo-admin.svg';
import AuthApiService from '../../../services/api/AuthApiService';
import { loginAdmin } from '../../../services/auth/authAdmin';

function LoginAdmin() {
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function authLogin(email, password) {
    setError('');
    try {
      setLoading(true);
      const resp = await AuthApiService.sendLoginAdmin({
        email,
        password,
      }).then((r) => r.data);
      if (resp.success) {
        loginAdmin(resp.data.token.access_token);
        history.push('/admin/home');
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (e) {
      console.error(e);
      setError(`${e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLogin
      image={Logo}
      authLogin={authLogin}
      error={error}
      loading={loading}
    />
  );
}

export default LoginAdmin;
