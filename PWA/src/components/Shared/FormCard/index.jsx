import { Formik } from 'formik';
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Cards from 'react-credit-cards';
import onlyNumber from '../../../services/utils/onlyNumber';
import ButtonsForm from '../../Admin/ButtonsForm';
import validationSchema from '../../../services/validations/validationCard';
import 'react-credit-cards/es/styles-compiled.css';
import './FormCard.css';

function FormCard(props) {
  const {
    valuesCard,
    handleSubmitCard,
    handleDelete,
    handleEdit,
    isNew,
    isSaving,
    isReadOnly,
  } = props;
  const [focus, setFocus] = useState('number');

  const handleInputFocus = (inputCard) => {
    setFocus(inputCard);
    console.warn(focus);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmitCard(values)}
      enableReinitialize
      initialValues={valuesCard}
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
        const getFlag = (cardNumber) => {
          const visa = /^4[0-9]{15}$/;
          const masterCard =
            /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{14}$/;

          if (visa.test(cardNumber)) setFieldValue('flag', 'Visa');
          if (masterCard.test(cardNumber)) setFieldValue('flag', 'MasterCard');
        };

        return (
          <>
            <ButtonsForm
              path="/user/dashboard/cartoes"
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isNew={isNew}
              isSaving={isSaving}
              isReadOnly={isReadOnly}
            />
            <div className="cards-container">
              <Cards
                className="react-card"
                number={Number(values.number) || ''}
                cvc={Number(values.security_code) || ''}
                name={values && values.holder}
                expiry={
                  values.expiration_date &&
                  `${values.expiration_date.split('-')[1]}${
                    values.expiration_date.split('-')[0]
                  }`
                }
                focused={focus}
                acceptedCards={['visa', 'mastercard']}
                placeholders={{ name: 'NOME NO CARTÃO' }}
              />
              <Form className="form-cards-dashboard">
                <Form.Row>
                  <Form.Group
                    as={Col}
                    sm={7}
                    className="form-group-address-dashboard"
                  >
                    <Form.Label>
                      Número
                      <Form.Control
                        type="text"
                        name="number"
                        disabled={isReadOnly}
                        value={values.number}
                        onChange={(e) => {
                          if (onlyNumber(e.target.value, false))
                            handleChange(e);
                          if (e.target.value.length === 16)
                            getFlag(e.target.value);
                        }}
                        onFocus={() => handleInputFocus('number')}
                        isInvalid={!!errors.number && touched.number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.number}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    sm={5}
                    className="form-group-address-dashboard"
                  >
                    <Form.Label>
                      Código de segurança
                      <Form.Control
                        type="text"
                        name="security_code"
                        disabled={isReadOnly}
                        value={values.security_code}
                        onChange={(e) => {
                          if (onlyNumber(e.target.value, false))
                            handleChange(e);
                        }}
                        onFocus={() => handleInputFocus('cvc')}
                        isInvalid={
                          !!errors.security_code && touched.security_code
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.security_code}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    sm={7}
                    className="form-group-address-dashboard"
                  >
                    <Form.Label>
                      Nome no cartão
                      <Form.Control
                        type="text"
                        name="holder"
                        disabled={isReadOnly}
                        value={values.holder}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus('name')}
                        isInvalid={!!errors.holder && touched.holder}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.holder}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    sm={5}
                    className="form-group-address-dashboard"
                  >
                    <Form.Label>
                      Data de validade
                      <Form.Control
                        type="month"
                        name="expiration_date"
                        disabled={isReadOnly}
                        value={values.expiration_date}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus('expiry')}
                        isInvalid={
                          !!errors.expiration_date && touched.expiration_date
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.expiration_date}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default FormCard;
