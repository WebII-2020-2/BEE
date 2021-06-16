import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormProdutoAdmin from '../../../components/FormProductAdmin';

function ProductsPage(props) {
  const { match } = props;

  return (
    <AdminContainer link="produtos">
      <FormProdutoAdmin productId={match.params.id} isNew={false} />
    </AdminContainer>
  );
}

export default ProductsPage;
