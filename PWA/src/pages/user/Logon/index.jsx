import React, { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import StoreContainer from '../../../components/Shared/StoreContainer';
import Login from './Tabs/Login';
import Register from './Tabs/Register';
import './Logon.css';
import LogonApiService from '../../../services/api/LogonApiService';
import { loginUser } from '../../../services/local-storage/authUser';

function Logon(props) {
  const { match } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tabForgotPassword, setTabForgotPassword] = useState(false);
  const [successSendEmail, setSuccessSendEmail] = useState('');

  const [tab, setTab] = useState('login');

  const handleUpdateTab = (newTab) => {
    setError('');
    setTabForgotPassword(false);
    setTab(newTab);
  };

  const handleForgotPassword = (value) => {
    setError('');
    setSuccessSendEmail('');
    setTabForgotPassword(value);
  };

  const login = async (form) => {
    setError('');
    try {
      setLoading(true);
      const resp = await LogonApiService.login(form)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        const { token, user } = resp.data;
        const userData = {
          token: token.access_token,
          ...user,
          name: user.name.split(' ', 1)[0],
        };
        loginUser(userData);
        if (!match) {
          history.push('/');
        } else {
          history.push(`/user/comprar`);
        }
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      setError(err.error_message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    setError('');
    try {
      setLoading(true);
      const resp = await LogonApiService.register(form)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setTab('login');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      setError(err.error_message);
    } finally {
      setLoading(false);
    }
  };

  const sendEmailForgotPassword = async (email) => {
    setError('');
    setSuccessSendEmail('');
    try {
      setLoading(true);
      const resp = await LogonApiService.forgotPassword({ email })
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setSuccessSendEmail('Link para recuperar senha enviado');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      setError(err.error_message);
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
                {!tabForgotPassword ? (
                  <>
                    <b>A</b>cesse com sua conta
                  </>
                ) : (
                  <>
                    <b>E</b>squeci a senha
                  </>
                )}
              </Card.Title>
              {tabForgotPassword && (
                <Card.Text className="text-center">
                  Para redefinir sua senha, informe o e-mail cadastrado na sua
                  conta e lhe enviaremos um link de recuperação
                </Card.Text>
              )}

              <Login
                login={login}
                loading={loading}
                error={error}
                tabForgotPassword={tabForgotPassword}
                handleForgotPassword={handleForgotPassword}
                successSendEmail={successSendEmail}
                sendEmailForgotPassword={sendEmailForgotPassword}
              />
            </Card.Body>
          )}
          {tab === 'register' && (
            <Card.Body>
              <Card.Title className="card-logon-title">
                <b>C</b>rie uma nova conta
              </Card.Title>
              <Register register={register} loading={loading} error={error} />
            </Card.Body>
          )}
        </Card>
      </div>
    </StoreContainer>
  );
}

export default Logon;
