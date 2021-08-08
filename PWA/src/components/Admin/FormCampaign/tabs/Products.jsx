import React, { useEffect, useState, useMemo } from 'react';
import { Form, Table } from 'react-bootstrap';
import PromotionAdminApiService from '../../../../services/api/PromotionAdminApiService';
import ProductAdminApiService from '../../../../services/api/ProductAdminApiService';
import CategoryAdminApiService from '../../../../services/api/CategoryAdminApiService';

import './Products.css';

function Products(props) {
  const { readOnly, values, handleUpdate } = props;

  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const productsList = useMemo(() => {
    if (selectedProducts.length) {
      return products.filter((product) =>
        selectedProducts.includes(product.id)
      );
    }
    return [];
  }, [selectedProducts, products]);

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
        const catWithProducts = resp.data.filter(
          (cat) => cat.count_products > 0
        );
        setCategories(catWithProducts);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`Error${err.code}:${err.error_message}`);
    }
  };

  const getCategoryProducts = async () => {
    try {
      if (selectedCategory !== 0) {
        const resp = await CategoryAdminApiService.getById(selectedCategory)
          .then((r) => r.data)
          .catch((r) => r.response.data);

        if (resp.success) {
          const productsIds = resp.data.products.map((p) => p.id);
          setSelectedProducts(productsIds);
        } else {
          throw resp.error;
        }
      } else {
        setSelectedProducts([]);
      }
    } catch (err) {
      console.error(`Error${err.code}:${err.error_message}`);
    }
  };
  useEffect(() => {
    getPromotions();
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedPromotion !== 0) {
      const promo = promotions.find(
        (promotion) => promotion.id === selectedPromotion
      );
      setSelectedProducts(promo.products);
    } else {
      setSelectedProducts([]);
    }
  }, [selectedPromotion]);

  useEffect(() => {
    getCategoryProducts();
  }, [selectedCategory]);

  useEffect(() => {
    handleUpdate({ ...values, product: productsList });
  }, [productsList]);

  return (
    <>
      <Form.Group className="form-campaign group product">
        <Form.Label
          className="form-campaign label"
          htmlFor="campaign-promotion"
        >
          Adicionar a partir de uma promoção
        </Form.Label>
        <Form.Control
          id="campaign-promotion"
          className="form-campaign control"
          disabled={readOnly || selectedCategory !== 0}
          as="select"
          onChange={(event) => {
            setSelectedPromotion(Number(event.target.value));
          }}
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
        <Form.Label htmlFor="campaign-category">
          Adicionar a partir de uma categoria
        </Form.Label>
        <Form.Control
          id="campaign-category"
          className="form-campaign control"
          disabled={readOnly || selectedPromotion !== 0}
          as="select"
          onChange={(event) => {
            setSelectedCategory(Number(event.target.value));
          }}
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
            <tr>
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
