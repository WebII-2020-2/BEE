import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormProdutoAdmin from '../../../components/FormProductAdmin';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';

function ProductsPage(props) {
  const { match } = props;

  const formData = ProductAdminApiService.getById(match.params.id);

  return (
    <AdminContainer link="produtos">
      <FormProdutoAdmin formData={formData} />
    </AdminContainer>
  );
}

export default ProductsPage;
