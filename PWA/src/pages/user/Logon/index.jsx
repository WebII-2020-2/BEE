import React, { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
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

  const register = async (form) => {
    try {
      setLoading(true);
      const resp = await LogonApiService.register(form).then((r) => r.data);
      if (resp.success) {
        setTab('login');
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (e) {
      console.error(`${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreContainer title="login">
      <div className="container-logon">
        <Card className="card-logon my-4">
          <Card.Header>
            <Nav variant="tabs" activeKey={tab} className="form-logon nav my-2">
              <Nav.Item>
                <Nav.Link
                  eventKey="login"
                  title="Entrar"
                  onClick={() => handleUpdateTab('login')}
                >
                  ENTRAR
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="register"
                  title="Cadastrar"
                  onClick={() => handleUpdateTab('register')}
                >
                  CADASTRAR
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          {tab === 'login' && (
            <Card.Body>
              <Card.Title className="card-logon-title">
                <b>A</b>cesse com sua conta
              </Card.Title>
              <Login login={login} loading={loading} />
            </Card.Body>
          )}
          {tab === 'register' && (
            <Card.Body>
              <Card.Title className="card-logon-title">
                <b>C</b>rie uma nova conta
              </Card.Title>
              <Register register={register} loading={loading} />
            </Card.Body>
          )}
        </Card>
      </div>
    </StoreContainer>
  );
}

export default Logon;
