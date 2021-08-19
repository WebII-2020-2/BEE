import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsList from '../../../../components/Admin/ButtonsList';
import LoadingPageAdmin from '../../../../components/Shared/LoadingPage';
import MonthCardAdmin from '../../../../components/Admin/Report/MonthCard';
import PaginationAdmin from '../../../../components/Shared/Pagination';
import ReportsAdminApiService from '../../../../services/api/ReportsApiService';
import './ReportsList.css';

function ReportsList(props) {
  const { match } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [valueSearch, setValueSearch] = useState();

  const getReports = async () => {
    setIsLoading(true);
    try {
      const resp = await ReportsAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setReports(resp.data.months);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reportsFilter = useMemo(() => {
    const filter = valueSearch || undefined;
    if (filter) {
      return reports.filter((report) => report.indexOf(filter) !== -1);
    }
    return -1;
  }, [valueSearch]);

  const totalPages = useMemo(() => {
    if (reportsFilter !== -1) {
      return Math.ceil(reportsFilter.length / 8);
    }
    return Math.ceil(reports.length / 8);
  });

  const reportsPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 12;
    const indexMax = indexMin + 12;
    if (reportsFilter !== -1) {
      return reportsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return reports.filter((x, index) => index >= indexMin && index < indexMax);
  }, [reportsFilter, reports, actualPage]);

  useEffect(() => {
    const page = Number(match.params.number);
    if (page) {
      setActualPage(page);
    } else {
      history.push('/admin/vendas/page/1');
    }
    getReports();
  }, []);

  return (
    <AdminContainer link="relatorios">
      <ButtonsList funcFilter={setValueSearch} />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <Container className="reports-list-admin container">
          {reportsPerPage.map((m) => (
            <MonthCardAdmin value={m} linkPath="/admin/relatorios" />
          ))}
        </Container>
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={setActualPage}
        baseUrl="/admin/relatorios"
      />
    </AdminContainer>
  );
}

export default ReportsList;
