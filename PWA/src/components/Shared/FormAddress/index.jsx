import { Formik } from 'formik';
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import ButtonsForm from '../../Admin/ButtonsForm';
import validationSchema from '../../../services/validations/validationAddress';
import './FormAddress.css';
import onlyNumber from '../../../services/utils/onlyNumber';
import AddressApiService from '../../../services/api/AddressApiService';

function FormAddress(props) {
  const {
    valuesAddress,
    handleSubmitAddress,
    handleDelete,
    handleEdit,
    isNew,
    isSaving,
    isReadOnly,
    path,
  } = props;
  const [loadingCep, setLoadingCep] = useState(false);

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
            setLoadingCep(true);
            const resp = await AddressApiService.getViaCep(cep).then(
              (r) => r.data
            );
            if (!resp.erro) {
              setFieldValue('city', resp.localidade);
              setFieldValue('state', resp.uf);
              if (resp.bairro) setFieldValue('district', resp.bairro);
              if (resp.logradouro)
                setFieldValue('public_place', resp.logradouro);
            } else {
              setFieldValue('city', '');
              setFieldValue('state', '');
            }
          } catch (err) {
            console.warn(err);
          } finally {
            setLoadingCep(false);
          }
        };

        return (
          <>
            <ButtonsForm
              path={path}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isNew={isNew}
              isSaving={isSaving}
              isReadOnly={isReadOnly}
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
                      disabled={isReadOnly || loadingCep}
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
                      disabled={isReadOnly || loadingCep}
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
                      disabled={isReadOnly || loadingCep}
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
                      disabled={isReadOnly || loadingCep}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly || loadingCep}
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
                      disabled={isReadOnly}
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
