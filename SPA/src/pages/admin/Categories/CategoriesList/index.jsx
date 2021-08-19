import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsListAdmin from '../../../../components/Admin/ButtonsList';
import PaginationAdmin from '../../../../components/Shared/Pagination';
import TableListAdmin from '../../../../components/Admin/TableList';
import LoadingPageAdmin from '../../../../components/Shared/LoadingPage';
import CategoryApiService from '../../../../services/api/CategoryApiService';

function CategoriesList(props) {
  const { match } = props;
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [valueSearch, setValueSearch] = useState();
  const [actualPage, setActualPage] = useState(1);

  const th = {
    id: 'ID',
    name: 'Nome',
    count_products: 'Quant. produtos cadastrados',
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const resp = await CategoryApiService.getAll().then((r) => r.data);
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

  const categoriesFilter = useMemo(() => {
    const filter = valueSearch || undefined;
    if (filter) {
      return categories.filter(
        (category) => category.name.toLowerCase().indexOf(filter) !== -1
      );
    }
    return -1;
  }, [valueSearch]);

  const totalPages = useMemo(() => {
    if (categoriesFilter !== -1) {
      return Math.ceil(categoriesFilter.length / 5);
    }
    return Math.ceil(categories.length / 5);
  }, [categories, categoriesFilter]);

  const categoriesPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 5;
    const indexMax = indexMin + 5;
    if (categoriesFilter !== -1) {
      return categoriesFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return categories.filter(
      (x, index) => index >= indexMin && index < indexMax
    );
  }, [actualPage, categoriesFilter, categories]);

  useEffect(() => {
    const page = Number(match.params.number);
    if (page) {
      setActualPage(page);
    } else {
      history.push('/admin/categorias/page/1');
    }
    getCategories();
  }, []);

  return (
    <AdminContainer link="categorias">
      <ButtonsListAdmin
        link="/admin/categorias/novo"
        funcFilter={setValueSearch}
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
        changePage={setActualPage}
        baseUrl="/admin/categorias"
      />
    </AdminContainer>
  );
}

export default CategoriesList;
