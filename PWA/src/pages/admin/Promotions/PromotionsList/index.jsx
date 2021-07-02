import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsList from '../../../../components/Admin/ButtonsList';
import PaginationAdmin from '../../../../components/Shared/Pagination';
import LoadingPageAdmin from '../../../../components/Shared/LoadingPage';
import TableListAdmin from '../../../../components/Admin/TableList';
import PromotionAdminApiService from '../../../../services/api/PromotionAdminApiService';
import formatDate from '../../../../services/utils/formatDate';
import formatFloat from '../../../../services/utils/formatFloat';

function PromotionsList(props) {
  const { match } = props;
  const history = useHistory();
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [valueSearch, setValueSearch] = useState();
  const [actualPage, setActualPage] = useState(1);

  const th = {
    name: 'Nome',
    value: 'Desconto',
    start_date: 'Ínicio',
    end_date: 'Fim',
  };

  const getPromotions = async () => {
    try {
      setIsLoading(true);
      const resp = await PromotionAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        const formattedPromotions = resp.data.map((promotion) => ({
          ...promotion,
          start_date: formatDate(promotion.start_date),
          end_date: formatDate(promotion.end_date),
          value:
            promotion.type === 1
              ? `R$ ${formatFloat(promotion.value)}`
              : `${promotion.value} %`,
        }));
        setPromotions(formattedPromotions);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const promotionsFilter = useMemo(() => {
    const filter = valueSearch || undefined;
    if (filter) {
      return promotions.filter(
        (promotion) => promotion.name.toLowerCase().indexOf(filter) !== -1
      );
    }
    return -1;
  }, [valueSearch]);

  const totalPages = useMemo(() => {
    if (promotionsFilter !== -1) {
      return Math.ceil(promotionsFilter.length / 5);
    }
    return Math.ceil(promotions.length / 5);
  }, [promotions, promotionsFilter]);

  const promotionsPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 5;
    const indexMax = indexMin + 5;
    if (promotionsFilter !== -1) {
      return promotionsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return promotions.filter(
      (x, index) => index >= indexMin && index < indexMax
    );
  }, [actualPage, promotionsFilter, promotions]);

  useEffect(() => {
    const page = Number(match.params.number);
    if (page) {
      setActualPage(page);
    } else {
      history.push('/admin/promocoes/page/1');
    }
    getPromotions();
  }, []);

  return (
    <AdminContainer link="promocoes">
      <ButtonsList link="/admin/promocoes/novo" funcFilter={setValueSearch} />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <TableListAdmin
          itens={promotionsPerPage}
          tableHead={th}
          linkEdit="/admin/promocoes"
        />
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={setActualPage}
        baseUrl="/admin/promocoes"
      />
    </AdminContainer>
  );
}

export default PromotionsList;
