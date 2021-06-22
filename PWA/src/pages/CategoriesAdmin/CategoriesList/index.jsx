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
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(categories.length / 5)
  );

  const th = {
    id: 'ID',
    name: 'Nome',
    count_products: 'Quantidade de produtos',
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const resp = await CategoryAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      } else {
        throw new Error(`${resp.error.error_message}`);
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
    if (categoriesFilter !== -1) {
      const categoryList = categoriesFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setTotalPages(Math.ceil(categoriesFilter.length / 5));
      setCategoriesPerPage(categoryList);
    } else {
      const categoryList = categories.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setTotalPages(Math.ceil(categories.length / 5));
      setCategoriesPerPage(categoryList);
    }
  };

  useEffect(() => {
    if (match.params.number) {
      setActualPage(Number(match.params.number));
    }
    getCategoriesPerPage();
  }, [categories, categoriesFilter, actualPage]);

  const handleChangePage = (page) => {
    setActualPage(page);
  };

  const getCategoryFilter = (valueSearch) => {
    const filter = valueSearch || undefined;

    if (filter) {
      const filtered = categories.filter(
        (category) => category.name.toLowerCase().indexOf(filter) !== -1
      );
      setCategoriesFilter(filtered);
    } else {
      setCategoriesFilter(-1);
    }
  };

  return (
    <AdminContainer link="categorias">
      <ButtonsListAdmin
        link="/admin/categorias/novo"
        funcFilter={getCategoryFilter}
      />
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
