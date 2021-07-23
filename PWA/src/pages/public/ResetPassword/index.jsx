import { Formik } from 'formik';
import React, { useState } from 'react';
import { Form, Alert, Button, Spinner, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import StoreContainer from '../../../components/Shared/StoreContainer';
import LogonApiService from '../../../services/api/LogonApiService';
import validationShema from '../../../services/validations/validationResetPassword';

function ResetPassword(props) {
  const { match } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = async (password) => {
    setError('');
    setSuccess('');
    try {
      setLoading(true);
      const resp = await LogonApiService.resetPassword({
        token: match.params.token,
        password,
      })
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setSuccess('Senha alterada com sucesso');
        setTimeout(() => {
          history.push('/user/login');
        }, 3000);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      setError(err.error_message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreContainer title="resetar senha">
      <div className="container-logon">
        <Card className="card-logon my-4">
          <Card.Body>
            <Card.Title className="card-logon-title">
              <b>A</b>lteração de senha
            </Card.Title>
            <Formik
              validationSchema={validationShema}
              onSubmit={(values) => resetPassword(values.password)}
              initialValues={{
                password: '',
                confirmationPassword: '',
              }}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="form-logon" onSubmit={handleSubmit}>
                  <Form.Group className="form-logon-group">
                    <Form.Label>
                      Nova senha
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password && touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="form-logon-group">
                    <Form.Label>
                      Confirme a nova senha
                      <Form.Control
                        type="password"
                        name="confirmationPassword"
                        value={values.confirmationPassword}
                        onChange={handleChange}
                        isInvalid={
                          !!errors.confirmationPassword &&
                          touched.confirmationPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmationPassword}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>
                  {error && (
                    <Alert variant="danger" className="text-center">
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert variant="success" className="text-center">
                      {success}
                    </Alert>
                  )}
                  <Button
                    className="btn-logon"
                    variant="warning"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" /> : 'Alterar'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </StoreContainer>
  );
}

export default ResetPassword;
