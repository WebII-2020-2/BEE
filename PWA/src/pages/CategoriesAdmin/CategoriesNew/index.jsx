import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormCategory from '../../../components/FormCategory';

function CategoriesNew() {
  return (
    <AdminContainer link="categorias">
      <FormCategory isNew formData={{}} />
    </AdminContainer>
  );
}

export default CategoriesNew;
