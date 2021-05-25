import React from 'react';
import FormLogin from '../../components/FormLogin';
import Logo from '../../assets/img/bee-logo-admin.svg';

function Login() {
  return (
    <div>
      <FormLogin image={Logo} />
    </div>
  );
}

export default Login;
