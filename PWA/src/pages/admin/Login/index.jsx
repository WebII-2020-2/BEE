import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowRight } from 'react-feather';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import LogonApiService from '../../../services/api/LogonApiService';
import { loginAdmin } from '../../../services/auth/authAdmin';
import logoAdmin from '../../../assets/img/bee-logo-admin.svg';
import './Login.css';

function LoginAdmin() {
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authLogin = async () => {
    setError('');
    try {
      setLoading(true);
      const resp = await LogonApiService.login({
        email,
        password,
      })
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        if (resp.data.user.level_access === 2) {
          loginAdmin(resp.data.token.access_token);
          history.push('/admin/inicio');
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { error_message: 'Login não autorizado' };
        }
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      setError(err.error_message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center" lg={4} sm={8} xs={10}>
            <img src={logoAdmin} alt="Logo do BEE" className="logo-login" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} sm={8} xs={10}>
            <Form className="form-login-admin">
              <Form.Group className="mt-3 input-login-admin-group">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  className="input input-login-admin"
                  id="email-login"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="input-login-admin-group">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  className="input input-login-admin"
                  id="password-login"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <span className="text-center">{error}</span>}
              <button
                disabled={loading}
                type="submit"
                className="rounded-pill mt-3 btn-login-admin"
                onClick={(event) => {
                  event.preventDefault();
                  return authLogin();
                }}
              >
                {loading ? (
                  <Spinner animation="border" variant="warning" />
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginAdmin;
