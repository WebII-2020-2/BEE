import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, FormControl, Table } from 'react-bootstrap';
import { Trash2 } from 'react-feather';
import LoadingPage from '../../Shared/LoadingPage';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import formatFloat from '../../../services/utils/formatFloat';
import './TablePromotionProducts.css';
import PromotionValidationContext from '../../../context/PromotionValidationContext';

function TablePromotionProductsAdmin(props) {
  const { readOnly, updateProducts, promotion } = props;
  const [productsDropdown, setProductsDropdown] = useState([]);
  const [productsTable, setProductsTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const promotionContext = useContext(PromotionValidationContext);

  const productValueMin = useMemo(() => {
    const valueMin = productsTable.reduce(
      (min, product) =>
        min === 0
          ? product.unitary_value
          : Math.min(min, product.unitary_value),
      0
    );
    return valueMin;
  }, [productsTable]);

  useEffect(() => {
    promotionContext({
      productValueMin,
      error: '',
    });
  }, [productValueMin]);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const resp = await ProductAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setProductsDropdown(resp.data);
      } else {
        throw new Error(`Failed to get products: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setProducts = () => {
    const productsPromotion = productsDropdown.filter((p) =>
      promotion.products.includes(p.id)
    );
    setProductsTable(productsPromotion);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProducts();
  }, [productsDropdown]);

  const productAddTable = (productId) => {
    const productSelected = productsDropdown.filter(
      (p) => p.id === Number(productId)
    );

    if (
      promotion.type === 1 &&
      productSelected[0].unitary_value <= promotion.value
    ) {
      promotionContext({
        productValueMin,
        error:
          'Valor do produto não pode ser menor que o valor do desconto da promoção',
      });
    } else {
      setProductsTable([...productsTable, ...productSelected]);
      updateProducts([...promotion.products, productId]);
    }
  };

  const productRemoveTable = (productId) => {
    const productsNotSelected = productsTable.filter(
      (p) => p.id !== Number(productId)
    );
    setProductsTable([...productsNotSelected]);

    const newProducts = promotion.products;
    newProducts.splice(newProducts.indexOf(Number(productId)), 1);
    updateProducts(newProducts);
  };

  const CustomMenu = React.forwardRef(({ children, className }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div ref={ref} className={className}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Pesquisar..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().indexOf(value) !== -1
          )}
        </ul>
      </div>
    );
  });

  const setDiscount = (productValue) => {
    let newValue;
    if (promotion.type === 1) {
      newValue = productValue - promotion.value;
    } else {
      newValue = productValue - (productValue * promotion.value) / 100;
    }
    return `R$ ${formatFloat(newValue)}`;
  };

  return (
    <div className="promotion-products-admin">
      <Dropdown
        onSelect={(productId) => productAddTable(productId)}
        className="my-2"
      >
        <Dropdown.Toggle variant="secondary">
          Selecione um produto
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {productsDropdown.map((product) => (
            <Dropdown.Item
              eventKey={product.id}
              key={product.id}
              disabled={
                readOnly || !!productsTable.find((p) => p.id === product.id)
              }
            >
              {product.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Table hover className="mt-2 table-promotion-products">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Preço com desconto</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {productsTable.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{`R$ ${formatFloat(product.unitary_value)}`}</td>
                <td>{setDiscount(product.unitary_value)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => productRemoveTable(product.id)}
                    disabled={readOnly}
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TablePromotionProductsAdmin;
