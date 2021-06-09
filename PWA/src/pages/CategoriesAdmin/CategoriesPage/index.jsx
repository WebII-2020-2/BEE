import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormCategory from '../../../components/FormCategory';

function CategoriesPage() {
  return (
    <AdminContainer link="categorias">
      <FormCategory isNew={false} />
    </AdminContainer>
  );
}

export default CategoriesPage;
