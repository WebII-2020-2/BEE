import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormProdutoAdmin from '../../../components/FormProductAdmin';

function ProductsNew() {
  return (
    <AdminContainer link="produtos">
      <FormProdutoAdmin formData={{}} isNew />
    </AdminContainer>
  );
}

export default ProductsNew;
