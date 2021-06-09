import React, { useEffect, useState } from 'react';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import TableListAdmin from '../../../components/TableListAdmin';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';

function CategoriesList() {
  const [categories, setCategories] = useState();
  const th = { id: 'ID', name: 'Nome' };

  useEffect(() => {
    try {
      const response = CategoryAdminApiService.getAll();
      setCategories(response);
    } catch (e) {
      console.log(e);
    }
  }, [categories]);

  return (
    <AdminContainer link="categorias">
      <ButtonsListAdmin link="/admin/categorias/novo" />
      <TableListAdmin itens={categories || []} tableHead={th} linkEdit="/admin/categorias" />
    </AdminContainer>
  );
}

export default CategoriesList;
