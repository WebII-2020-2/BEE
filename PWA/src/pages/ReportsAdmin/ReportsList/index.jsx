import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Calendar } from 'react-feather';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import LoadingPageAdmin from '../../../components/LoadingPageAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import ReportsAdminApiService from '../../../services/api/ReportsAdminApiService';
import './ReportsList.css';

function ReportsList(props) {
  const { match } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [reportsFilter, setReportsFilter] = useState([]);
  const [reportsPerPage, setReportsPerPage] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getReports = async () => {
    setIsLoading(true);
    try {
      const resp = await ReportsAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setReports(resp.data.months);
      } else {
        throw new Error(`Unable to get reports: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getReportsFilter = (valueSearch) => {
    const filter = valueSearch || undefined;
    if (filter) {
      const filtered = reports.filter(
        (report) => report.indexOf(filter) !== -1
      );
      setReportsFilter(filtered);
    } else {
      setReportsFilter(-1);
    }
  };

  const getReportsPerPage = () => {
    const indexMin = (actualPage - 1) * 12;
    const indexMax = indexMin + 12;
    if (reportsFilter !== -1) {
      const reportsList = reportsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setReportsPerPage(reportsList);
      setTotalPages(Math.ceil(reportsFilter.length / 12));
    } else {
      const reportsList = reports.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setReportsPerPage(reportsList);
      setTotalPages(Math.ceil(reports.length / 12));
    }
  };

  const handleChangePage = (page) => {
    setActualPage(page);
  };

  const MonthCard = ({ value }) => (
    <Link
      className="reports-list-admin card"
      to={`/admin/relatorios/${value.replace('/', '-')}`}
    >
      <Calendar className="reports-list-admin icon" size={24} />
      <span className="reports-list-admin text">{value}</span>
    </Link>
  );

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    if (match.params.number) {
      setActualPage(Number(match.params.number));
    }
    getReportsPerPage();
  }, [reports, reportsFilter, actualPage, totalPages]);

  return (
    <AdminContainer link="relatorios">
      <ButtonsListAdmin funcFilter={getReportsFilter} />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <Container className="reports-list-admin container">
          {reportsPerPage.map((m) => (
            <MonthCard value={m} />
          ))}
        </Container>
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={handleChangePage}
        baseUrl="/admin/relatorios"
      />
    </AdminContainer>
  );
}

export default ReportsList;
