import React, { useState, useEffect } from 'react';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsList from '../../../../components/Admin/ButtonsList';
import PaginationAdmin from '../../../../components/Shared/Pagination';
import LoadingPageAdmin from '../../../../components/Shared/LoadingPage';
import TableListAdmin from '../../../../components/Admin/TableList';
import PromotionAdminApiService from '../../../../services/api/PromotionAdminApiService';

function PromotionsList(props) {
  const { match } = props;
  const [promotions, setPromotions] = useState([]);
  const [promotionsPerPage, setPromotionsPerPage] = useState([]);
  const [promotionsFilter, setPromotionsFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(promotions.length / 5)
  );

  const th = {
    name: 'Nome',
    start_date: 'Ínicio',
    end_date: 'Fim',
    value: 'Valor',
  };

  const getPromotions = async () => {
    try {
      setIsLoading(true);
      const resp = await PromotionAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setPromotions(
          resp.data.map((promotion) => ({
            ...promotion,
            start_date: new Date(promotion.start_date).toLocaleDateString(
              'pt-BR',
              {
                timeZone: 'UTC',
              }
            ),
            end_date: new Date(promotion.end_date).toLocaleDateString('pt-BR', {
              timeZone: 'UTC',
            }),
          }))
        );
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
    getPromotions();
  }, []);

  const getPromotionsPerPage = () => {
    const indexMin = (actualPage - 1) * 5;
    const indexMax = indexMin + 5;
    if (promotionsFilter !== -1) {
      const promotionList = promotionsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setTotalPages(Math.ceil(promotionsFilter.length / 5));
      setPromotionsPerPage(promotionList);
    } else {
      const promotionList = promotions.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setTotalPages(Math.ceil(promotions.length / 5));
      setPromotionsPerPage(promotionList);
    }
  };

  useEffect(() => {
    if (match.params.number) {
      setActualPage(Number(match.params.number));
    }
    getPromotionsPerPage();
  }, [promotions, promotionsFilter, actualPage]);

  const handleChangePage = (page) => {
    setActualPage(page);
  };

  const getPromotionFilter = (valueSearch) => {
    const filter = valueSearch || undefined;

    if (filter) {
      const filtered = promotions.filter(
        (promotion) => promotion.name.toLowerCase().indexOf(filter) !== -1
      );
      setPromotionsFilter(filtered);
    } else {
      setPromotionsFilter(-1);
    }
  };

  return (
    <AdminContainer link="promocoes">
      <ButtonsList
        link="/admin/promocoes/novo"
        funcFilter={getPromotionFilter}
      />
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
        changePage={handleChangePage}
        baseUrl="/admin/promocoes"
      />
    </AdminContainer>
  );
}

export default PromotionsList;
