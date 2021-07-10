import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import StoreContainer from '../../../components/Shared/StoreContainer';
import Login from './Tabs/Login';
import Register from './Tabs/Register';
import './Logon.css';
import LogonApiService from '../../../services/api/LogonApiService';
import { loginUser } from '../../../services/auth/authUser';

function Logon() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('login');

  const handleUpdateTab = (newTab) => {
    setTab(newTab);
  };

  const login = async (form) => {
    try {
      setLoading(true);
      const resp = await LogonApiService.login(form).then((r) => r.data);
      if (resp.success) {
        loginUser(resp.data.token.access_token);
        history.push('/');
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (e) {
      console.error(`${e}`);
    } finally {
      setLoading(false);
    }
  };

  const register = (form) => {
    console.warn(form);
  };

  return (
    <StoreContainer title="login">
      <Nav variant="tabs" activeKey={tab} className="form-logon nav my-4">
        <Nav.Item>
          <Nav.Link
            eventKey="register"
            onClick={() => handleUpdateTab('register')}
          >
            Cadastre-se
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="login" onClick={() => handleUpdateTab('login')}>
            Entrar
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {tab === 'login' && <Login login={login} loading={loading} />}
      {tab === 'register' && <Register register={register} />}
    </StoreContainer>
  );
}

export default Logon;
