import { Formik } from 'formik';
import React from 'react';
import { Col, Form } from 'react-bootstrap';
import ButtonsFormAdmin from '../../Admin/ButtonsForm';
import validationSchema from '../../../services/validations/validationAddress';
import './FormAddress.css';
import onlyNumber from '../../../services/utils/onlyNumber';
import AddressApiService from '../../../services/api/AddressApiService';

function FormAddress(props) {
  const { valuesAddress, handleSubmitAddress, isNew, isSaving } = props;

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmitAddress(values)}
      enableReinitialize
      initialValues={valuesAddress}
    >
      {({
        handleSubmit,
        handleChange,
        handleReset,
        values,
        errors,
        touched,
        setFieldValue,
      }) => {
        const getCityState = async (cep) => {
          try {
            const resp = await AddressApiService.getViaCep(cep).then(
              (r) => r.data
            );
            if (!resp.erro) {
              setFieldValue('city', resp.localidade);
              setFieldValue('state', resp.uf);
            } else {
              setFieldValue('city', '');
              setFieldValue('state', '');
            }
          } catch (err) {
            console.warn(err);
          }
        };

        return (
          <>
            <ButtonsFormAdmin
              path="/user/dashboard/enderecos"
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              isNew={isNew}
              isSaving={isSaving}
            />
            <Form className="form-address-dashboard">
              <Form.Row>
                <Form.Group
                  as={Col}
                  sm={5}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    CEP
                    <Form.Control
                      type="text"
                      name="zip_code"
                      value={values.zip_code}
                      onChange={(e) => {
                        if (onlyNumber(e.target.value, false)) handleChange(e);
                        if (e.target.value.length === 8)
                          getCityState(e.target.value);
                      }}
                      isInvalid={errors.zip_code && touched.zip_code}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zip_code}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  as={Col}
                  sm={5}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    Cidade
                    <Form.Control
                      type="text"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city && touched.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  as={Col}
                  sm={2}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    Estado
                    <Form.Control
                      type="text"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      isInvalid={!!errors.state && touched.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  sm={10}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    Rua / Avenida
                    <Form.Control
                      type="text"
                      name="public_place"
                      value={values.public_place}
                      onChange={handleChange}
                      isInvalid={!!errors.public_place && touched.public_place}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.public_place}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  as={Col}
                  sm={2}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    Número
                    <Form.Control
                      type="text"
                      name="number"
                      value={values.number}
                      onChange={handleChange}
                      isInvalid={!!errors.number && touched.number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.number}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  sm={6}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    Bairro
                    <Form.Control
                      type="text"
                      name="district"
                      value={values.district}
                      onChange={handleChange}
                      isInvalid={!!errors.district && touched.district}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.district}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  as={Col}
                  sm={6}
                  className="form-group-address-dashboard"
                >
                  <Form.Label>
                    Complemento
                    <Form.Control
                      type="text"
                      name="complement"
                      value={values.complement}
                      onChange={handleChange}
                      isInvalid={!!errors.complement && touched.complement}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.complement}
                    </Form.Control.Feedback>
                  </Form.Label>
                </Form.Group>
              </Form.Row>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default FormAddress;
