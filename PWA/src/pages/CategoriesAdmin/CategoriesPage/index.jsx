import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormCategoryAdmin from '../../../components/FormCategoryAdmin';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';

function CategoriesPage(props) {
  const { match } = props;

  const formData = CategoryAdminApiService.getById(match.params.id);

  return (
    <AdminContainer link="categorias">
      <FormCategoryAdmin isNew={false} formData={formData} />
    </AdminContainer>
  );
}

export default CategoriesPage;
