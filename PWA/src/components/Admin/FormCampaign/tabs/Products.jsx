import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Form, Table } from 'react-bootstrap';
import PromotionAdminApiService from '../../../../services/api/PromotionAdminApiService';
import ProductAdminApiService from '../../../../services/api/ProductAdminApiService';

import './Products.css';
import CampaignProductsContext from '../../../../context/CampaignProductsContext';

function Products(props) {
  const { readOnly, values } = props;

  const campaignContext = useContext(CampaignProductsContext);

  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(0);
  const [productsIDS, setProductsIDS] = useState(values ? values.products : []);
  const [products, setProducts] = useState([]);

  const productsList = useMemo(() => {
    if (productsIDS.length) {
      return products.filter((p) => productsIDS.includes(p.id));
    }
    return [];
  }, [productsIDS, products]);

  const getProducts = async () => {
    try {
      const resp = await ProductAdminApiService.getAll()
        .then((r) => r.data)
        .catch((r) => r.response.data);
      if (resp.success) {
        setProducts(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`Error${err.code}: ${err.error_message}`);
    }
  };

  const getPromotions = async () => {
    try {
      const resp = await PromotionAdminApiService.getAll()
        .then((r) => r.data)
        .catch((r) => r.response.data);
      if (resp.success) {
        setPromotions(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`Error${err.code}:${err.error_message}`);
    }
  };

  const handleUpdatePromotion = (event) => {
    const { value } = event.target;
    setSelectedPromotion(Number(value));
  };

  useEffect(() => {
    getPromotions();
    getProducts();
  }, []);

  useEffect(() => {
    if (JSON.stringify(values.products) !== JSON.stringify(productsIDS))
      campaignContext({ products: productsIDS });
  }, [productsIDS]);

  useEffect(() => {
    const initialPromotion = promotions.find(
      (p) => JSON.stringify(p.products) === JSON.stringify(productsIDS)
    );
    setSelectedPromotion(initialPromotion ? initialPromotion.id : 0);
  }, [promotions]);

  useEffect(() => {
    if (promotions.length && selectedPromotion) {
      const promo = promotions.find((p) => p.id === selectedPromotion);
      setProductsIDS(promo.products);
    }
  }, [promotions, selectedPromotion]);

  return (
    <>
      <Form.Group className="form-campaign group product">
        <Form.Label
          className="form-campaign label"
          htmlFor="campaign-promotion"
        >
          Selecione uma promoção
        </Form.Label>
        <Form.Control
          id="campaign-promotion"
          className="form-campaign control"
          disabled={readOnly}
          as="select"
          onChange={handleUpdatePromotion}
          value={selectedPromotion}
        >
          <option value="0">Não selecionado</option>
          {promotions.map((promotion) => (
            <option value={promotion.id} key={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Table className="campaign-products">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Valor</td>
          </tr>
        </thead>
        <tbody>
          {productsList.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                {(p.value_promotion || p.unitary_value).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Products;
