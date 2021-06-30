import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Nav } from 'react-bootstrap';
import PromotionAdminApiService from '../../../services/api/PromotionAdminApiService';
import ButtonsForm from '../ButtonsForm';
import ValidationErrorsContainer from '../../Shared/ValidationErrorsContainer';
import validationSchema from '../../../services/validations/validationPromotionAdmin';
import TablePromotionProducts from '../../TablePromotionProductsAdmin';
import './FormPromotion.css';

function FormPromotionAdmin(props) {
  const { isNew, promotionId } = props;
  const history = useHistory();

  const [values, setValues] = useState({
    name: '',
    type: 1,
    value: 0,
    start_date: null,
    end_date: null,
  });

  const [isReadOnly, setIsReadOnly] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);
  const [tab, setTab] = useState('details');

  const getPromotionById = async () => {
    try {
      const resp = await PromotionAdminApiService.getById(
        Number(promotionId)
      ).then((r) => r.data);
      if (resp.success) {
        setValues(resp.data);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
      history.push('/admin/promocoes');
    }
  };

  useEffect(() => {
    if (!isNew) {
      getPromotionById();
    }
  }, []);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: Number(event.target.value) || event.target.value,
    });
  };

  const handleChangeTab = (newTab) => {
    setTab(newTab);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const form = {
      ...values,
    };
    delete form.id;
    try {
      const isValid = await validationSchema
        .validate(form, { abortEarly: false })
        .then(() => {
          setErrors([]);
          return true;
        })
        .catch((err) => {
          setErrors([...err.errors]);
          return undefined;
        });
      if (isValid !== undefined) {
        if (isNew) {
          const resp = await PromotionAdminApiService.createNew(form).then(
            (r) => r.data
          );
          if (resp.sucess) {
            history.push('/admin/promocoes');
          } else {
            throw new Error(`Failed to create promotion: ${resp.error}`);
          }
        } else {
          const resp = await PromotionAdminApiService.update(
            form,
            promotionId
          ).then((r) => r.data);
          if (resp.sucess) {
            handleEdit();
          } else {
            throw new Error(`${resp.error.error_message}`);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    try {
      PromotionAdminApiService.remove(promotionId);
      history.push('/admin/promocoes');
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearErrors = () => {
    setErrors([]);
  };

  return (
    <>
      <ButtonsForm
        path="/admin/promocoes"
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isNew={isNew}
        isReadOnly={isReadOnly}
        isSaving={isSaving}
      />

      <ValidationErrorsContainer
        errors={[...errors]}
        clear={handleClearErrors}
      />

      {!isNew && (
        <Nav
          variant="tabs"
          activeKey={tab}
          className="form-promotion-admin nav"
        >
          <Nav.Item>
            <Nav.Link
              eventKey="details"
              onClick={() => handleChangeTab('details')}
            >
              Informações gerais
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="products"
              onClick={() => handleChangeTab('products')}
            >
              Produtos da promoção
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}

      {tab === 'details' && (
        <Form className={`form-promotion-admin container ${isNew && 'mt-3'}`}>
          <Form.Group className="form-promotion-admin group lg">
            <Form.Label className="form-promotion-admin label">Nome</Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={isReadOnly}
              type="text"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group sm">
            <Form.Label className="form-promotion-admin label">
              Data de início
            </Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={isReadOnly}
              type="date"
              value={values.start_date}
              name="start_date"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group sm">
            <Form.Label className="form-promotion-admin label">
              Data de fim
            </Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={isReadOnly}
              type="date"
              value={values.end_date}
              name="end_date"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group">
            <Form.Label className="form-promotion-admin label">
              Tipo do valor
            </Form.Label>
            <Form.Check
              type="radio"
              name="type"
              label="Decimal"
              disabled={isReadOnly}
              value={1}
              checked={values.type === 1}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              name="type"
              label="Porcentagem"
              disabled={isReadOnly}
              value={2}
              checked={values.type === 2}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group sm">
            <Form.Label className="form-promotion-admin label">
              Valor
            </Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={isReadOnly}
              type="number"
              min="0"
              name="value"
              value={values.value}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      )}

      {tab === 'products' && (
        <TablePromotionProducts promotionId={promotionId} />
      )}
    </>
  );
}

export default FormPromotionAdmin;
