import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormCategoryAdmin from '../../../components/FormCategoryAdmin';

function CategoriesNew() {
  return (
    <AdminContainer link="categorias">
      <FormCategoryAdmin isNew formData={{}} />
    </AdminContainer>
  );
}

export default CategoriesNew;
