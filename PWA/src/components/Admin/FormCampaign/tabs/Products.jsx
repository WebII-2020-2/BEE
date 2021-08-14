import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Form, Table } from 'react-bootstrap';
import CategoryAdminApiService from '../../../../services/api/CategoryAdminApiService';
import PromotionAdminApiService from '../../../../services/api/PromotionAdminApiService';
import ProductAdminApiService from '../../../../services/api/ProductAdminApiService';

import './Products.css';
import CampaignProductsContext from '../../../../context/CampaignProductsContext';

function Products(props) {
  const { readOnly, values } = props;

  const campaignContext = useContext(CampaignProductsContext);

  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [productsIDS, setProductsIDS] = useState(
    values.products ? values.products.map((p) => p.id) : []
  );
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

  const getCategories = async () => {
    try {
      const resp = await CategoryAdminApiService.getAll()
        .then((r) => r.data)
        .catch((r) => r.response.data);
      if (resp.success) {
        setCategories(resp.data);
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

  const handleUpdateCategory = (event) => {
    const { value } = event.target;
    setSelectedCategory(Number(value));
  };

  useEffect(() => {
    getPromotions();
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (JSON.stringify(values.products) !== JSON.stringify(productsList))
      campaignContext({ products: productsIDS });
  }, [productsList]);

  useEffect(() => {
    if (productsIDS.length) {
      const initialPromotion = promotions.find(
        (p) => JSON.stringify(p.products) === JSON.stringify(productsIDS)
      );
      setSelectedPromotion(initialPromotion ? initialPromotion.id : 0);
    }
    setSelectedPromotion(0);
  }, [promotions]);

  useEffect(() => {
    if (productsIDS.length) {
      const initialCategory = categories.find(
        (c) => JSON.stringify(c.products) === JSON.stringify(productsIDS)
      );
      setSelectedCategory(initialCategory ? initialCategory.id : 0);
    }
    setSelectedCategory(0);
  }, [categories]);

  useEffect(() => {
    if (promotions.length && selectedPromotion) {
      const promo = promotions.find((p) => p.id === selectedPromotion);
      setProductsIDS(promo.products);
    }
  }, [promotions, selectedPromotion]);

  useEffect(() => {
    if (categories.length && selectedCategory) {
      const cat = categories.find((c) => c.id === selectedCategory);
      setProductsIDS(cat.products);
    }
  }, [categories, selectedCategory]);

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
      <Form.Group className="form-campaign group product">
        <Form.Label className="form-campaign label" htmlFor="campaign-category">
          Selecione uma categoria
        </Form.Label>
        <Form.Control
          id="campaign-category"
          className="form-campaign control"
          disabled={readOnly}
          as="select"
          onChange={handleUpdateCategory}
          value={selectedCategory}
        >
          <option value="0">Não selecionado</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
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
