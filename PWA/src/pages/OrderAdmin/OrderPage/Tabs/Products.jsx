import React, { useMemo } from 'react';
import TableList from '../../../../components/TableListAdmin';
import formatFloat from '../../../../services/utils/formatFloat';

function Products(props) {
  const { order } = props;

  const th = {
    name: 'Nome',
    quantity: 'Quantidade',
    unitary_value_selled: 'Valor Unitário',
    total_value: 'Valor Total',
  };

  const products = useMemo(() => {
    if (order.products !== undefined) {
      return order.products.map((p) => ({
        ...p,
        unitary_value_selled: formatFloat(p.unitary_value_selled),
        total_value: formatFloat(p.quantity * p.unitary_value_selled),
      }));
    }
    return {};
  }, [order]);

  return <TableList itens={products} tableHead={th} />;
}

export default Products;
