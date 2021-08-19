import './Details.css';

import { Form, Image } from 'react-bootstrap';

import React from 'react';
import emptyImage from '../../../../assets/img/empty-banner.png';

function Details(props) {
  const { readOnly, values, handleUpdate } = props;

  return (
    <>
      <Form.Group className="form-campaign group">
        <Form.Label className="form-campaign label" htmlFor="campaign-title">
          Título
        </Form.Label>
        <Form.Control
          id="campaign-title"
          className="form-campaign control"
          readOnly={readOnly}
          type="text"
          name="title"
          value={values.title}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-campaign group">
        <Form.Check
          id="campaign-status"
          className="form-campaign control check"
          readOnly={readOnly}
          type="switch"
          name="active"
          checked={values.active}
          label={values.active ? 'Campanha ativa' : 'Campanha inativa'}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-campaign group description">
        <Form.Label
          className="form-campaign label"
          htmlFor="campaign-description"
        >
          Descrição
        </Form.Label>
        <Form.Control
          id="campaign-description"
          as="textarea"
          className="form-campaign control"
          readOnly={readOnly}
          name="description"
          value={values.description}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-campaign group image">
        <Image
          className="form-campaign image"
          src={values.image || emptyImage}
        />
        <Form.File
          label="Selecione uma imagem para a campanha"
          className="form-campaign control"
          accept="image/*"
          disabled={readOnly}
          name="image"
          onChange={handleUpdate}
          custom
        />
      </Form.Group>
    </>
  );
}

export default Details;
