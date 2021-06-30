import { Button, Dropdown, FormControl, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { Trash2 } from 'react-feather';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import './TablePromotionProducts.css';

function TablePromotionProductsAdmin() {
  // const { promotionId } = props;
  const [products, setProducts] = useState([]);
  const [productsTable, setProductsTable] = useState([]);

  const getProducts = async () => {
    try {
      const resp = await ProductAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setProducts(resp.data);
      } else {
        throw new Error(`Failed to get products: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const productAddTable = (productId) => {
    const productSelected = products.filter((p) => p.id === Number(productId));
    setProductsTable([...productsTable, ...productSelected]);
  };

  const productRemoveTable = (productId) => {
    const productsNotSelected = productsTable.filter(
      (p) => p.id !== Number(productId)
    );
    setProductsTable([...productsNotSelected]);
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
          {products.map((product) => (
            <Dropdown.Item eventKey={product.id} key={product.id}>
              {product.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Table hover className="mt-2">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Preço com desconto</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {productsTable.map((productSelected) => (
            <tr key={productSelected.id}>
              <td>{productSelected.name}</td>
              <td>{productSelected.unitary_value}</td>
              <td>50</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => productRemoveTable(productSelected.id)}
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
