import React, { useEffect, useState } from 'react';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import TableListAdmin from '../../../components/TableListAdmin';
import LoadingPageAdmin from '../../../components/LoadingPageAdmin';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';

function CategoriesList(props) {
  const { match } = props;
  const [categories, setCategories] = useState([]);
  const [categoriesPerPage, setCategoriesPerPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);
  const totalPages = Math.ceil(categories.length / 5);

  const th = { id: 'ID', name: 'Nome' };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const resp = await CategoryAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      } else {
        throw new Error(`Unable to get categories: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategoriesPerPage = () => {
    const indexMin = (actualPage - 1) * 5;
    const indexMax = indexMin + 5;
    const categoryList = categories.filter(
      (x, index) => index >= indexMin && index < indexMax
    );
    setCategoriesPerPage(categoryList);
  };

  useEffect(() => {
    if (match.params.number) {
      setActualPage(Number(match.params.number));
    }
    getCategoriesPerPage();
  }, [categories, actualPage]);

  const handleChangePage = (page) => {
    setActualPage(page);
  };

  return (
    <AdminContainer link="categorias">
      <ButtonsListAdmin link="/admin/categorias/novo" />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <TableListAdmin
          itens={categoriesPerPage}
          tableHead={th}
          linkEdit="/admin/categorias"
        />
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={handleChangePage}
        baseUrl="/admin/categorias"
      />
    </AdminContainer>
  );
}

export default CategoriesList;
