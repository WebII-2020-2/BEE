import React, { useEffect, useState } from 'react';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import TableListAdmin from '../../../components/TableListAdmin';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [actualPage, setActualPage] = useState(1);

  const th = { id: 'ID', name: 'Nome' };
  const size = 1;

  const handleChangePage = (value) => {
    setActualPage(value);
  };

  const getCategories = async () => {
    try {
      const resp = await CategoryAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      } else {
        throw new Error(`Unable to get categories: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminContainer link="categorias">
      <ButtonsListAdmin link="/admin/categorias/novo" />
      <TableListAdmin
        itens={categories}
        tableHead={th}
        linkEdit="/admin/categorias"
      />
      <PaginationAdmin
        itensCount={size}
        actualPage={actualPage}
        click={handleChangePage}
      />
    </AdminContainer>
  );
}

export default CategoriesList;
