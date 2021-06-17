import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormCategoryAdmin from '../../../components/FormCategoryAdmin';

function CategoriesPage(props) {
  const { match } = props;

  return (
    <AdminContainer link="categorias">
      <FormCategoryAdmin isNew={false} categoryId={match.params.id} />
    </AdminContainer>
  );
}

export default CategoriesPage;
