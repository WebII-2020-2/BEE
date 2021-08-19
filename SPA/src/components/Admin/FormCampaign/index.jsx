import './FormCampaign.css';
import { Container, Nav } from 'react-bootstrap';
import React, { useState } from 'react';
import Details from './tabs/Details';
import Products from './tabs/Products';

function FormCampaign(props) {
  const { readOnly, update, values } = props;
  const [tab, setTab] = useState('details');

  const handleUpdate = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      const file = files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) =>
          update({
            ...values,
            [name]: e.target.result,
          });
        reader.readAsDataURL(file);
      }
    } else if (name === 'active') {
      update({ ...values, [name]: !values[name] });
    } else {
      update({
        ...values,
        [name]: Number(value) || value,
      });
    }
  };

  return (
    <>
      <Nav variant="tabs" activeKey={tab} className="campaign nav">
        <Nav.Item>
          <Nav.Link eventKey="details" onClick={() => setTab('details')}>
            Informações gerais
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="products" onClick={() => setTab('products')}>
            Produtos
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="form-campaign">
        {tab === 'details' && (
          <Details
            readOnly={readOnly}
            values={values}
            handleUpdate={handleUpdate}
          />
        )}
        {tab === 'products' && (
          <Products readOnly={readOnly} values={values} handleUpdate={update} />
        )}
      </Container>
    </>
  );
}

export default FormCampaign;
