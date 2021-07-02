import React, { useEffect, useState } from 'react';
import { Button, Dropdown, FormControl, Table, Spinner } from 'react-bootstrap';
import { Trash2 } from 'react-feather';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import formatFloat from '../../../services/utils/formatFloat';
import './TablePromotionProducts.css';

function TablePromotionProductsAdmin(props) {
  const { readOnly, values, updateProducts } = props;
  const [productsDropdown, setProductsDropdown] = useState([]);
  const [productsTable, setProductsTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const productsIds = values;

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
      productsIds.includes(p.id)
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
    productsIds.push(Number(productId));
    const productSelected = productsDropdown.filter(
      (p) => p.id === Number(productId)
    );

    setProductsTable([...productsTable, ...productSelected]);
    updateProducts(productsIds);
  };

  const productRemoveTable = (productId) => {
    productsIds.splice(productsIds.indexOf(Number(productId)), 1);
    const productsNotSelected = productsTable.filter(
      (p) => p.id !== Number(productId)
    );

    setProductsTable([...productsNotSelected]);
    updateProducts(productsIds);
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

  return (
    <div className="form-promotion-admin container">
      <Dropdown
        onSelect={(productId) => productAddTable(productId)}
        className="my-2"
      >
        <Dropdown.Toggle variant="secondary">
          Selecione um produto
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {isLoading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            productsDropdown.map((product) => (
              <Dropdown.Item
                eventKey={product.id}
                key={product.id}
                disabled={
                  readOnly || !!productsTable.find((p) => p.id === product.id)
                }
              >
                {product.name}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>
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
              <td>50</td>
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
    </div>
  );
}

export default TablePromotionProductsAdmin;
