import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import LoadingPageAdmin from '../../../components/LoadingPageAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import TableListAdmin from '../../../components/TableListAdmin';
import OrderAdminApiService from '../../../services/api/OrderAdminApiService';
import orderStatus from '../../../services/utils/orderStatus';
import formatFloat from '../../../services/utils/formatFloat';
import formatDate from '../../../services/utils/formatDate';

function OrderList(props) {
  const { match } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [valueSearch, setValueSearch] = useState();
  const [actualPage, setActualPage] = useState();

  const th = {
    invoice: 'Nº Venda',
    quantity: 'Quant. Produtos',
    value_total: 'Valor total',
    status_order: 'STATUS',
    name_user: 'Usuário',
    selled_date: 'DATA',
  };

  const getOrder = async () => {
    setIsLoading(true);
    try {
      const resp = await OrderAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        const formattedOrders = resp.data.map((order) => ({
          ...order,
          value_total: `R$ ${formatFloat(order.value_total)}`,
          status_order: orderStatus.convert(order.status_order),
          selled_date: formatDate(order.selled_date),
        }));
        setOrders(formattedOrders);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const ordersFilter = useMemo(() => {
    const filter = valueSearch || undefined;
    if (filter) {
      const dateFilter = formatDate(filter);
      return orders.filter((order) => order.selled_date === dateFilter);
    }
    return -1;
  }, [valueSearch, orders]);

  const totalPages = useMemo(() => {
    if (ordersFilter !== -1) {
      return Math.ceil(ordersFilter.length / 8);
    }
    return Math.ceil(orders.length / 8);
  }, [orders, ordersFilter]);

  const ordersPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 8;
    const indexMax = indexMin + 8;
    if (ordersFilter !== -1) {
      return ordersFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return orders.filter((x, index) => index >= indexMin && index < indexMax);
  }, [actualPage, ordersFilter, orders]);

  useEffect(() => {
    const page = Number(match.params.number);
    if (page) {
      setActualPage(page);
    } else {
      history.push('/admin/vendas/page/1');
    }
    getOrder();
  }, []);

  return (
    <AdminContainer link="vendas">
      <ButtonsListAdmin funcFilter={setValueSearch} filterType="date" />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <TableListAdmin
          itens={ordersPerPage}
          tableHead={th}
          linkEdit="/admin/vendas"
        />
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={setActualPage}
        baseUrl="/admin/vendas"
      />
    </AdminContainer>
  );
}

export default OrderList;
