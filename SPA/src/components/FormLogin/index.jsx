import React, { useState } from 'react';
import { ArrowRight } from 'react-feather';
import {
  Container, Row, Col, Spinner,
} from 'react-bootstrap';
import './FormLogin.css';

function FormLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    image, authLogin, error, loading,
  } = props;

  return (
    <div className="login">
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center" lg={4} sm={8} xs={10}>
            <img src={image} alt="Logo do BEE" className="logo-login" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} sm={8} xs={10}>
            <form className="form-login">
              <label htmlFor="email-login" className="mt-3 input-group">
                E-mail
                {' '}
                <br />
                <input
                  type="email"
                  className="input-login"
                  id="email-login"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="password-login" className="input-group">
                Senha
                {' '}
                <br />
                <input
                  type="password"
                  className="input-login"
                  id="password-login"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error && (<span className="text-center">{error}</span>)}
              <button
                disabled={loading}
                type="button"
                className="rounded-pill mt-3 btn-login"
                onClick={() => authLogin(email, password)}
              >
                {loading ? (<Spinner animation="border" variant="warning" />)
                  : (
                    <>
                      Login
                      <ArrowRight className="ml-2" />
                    </>
                  )}
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FormLogin;
