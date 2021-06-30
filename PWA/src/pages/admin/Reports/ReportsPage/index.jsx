import React, { useEffect, useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import ReportCardAdmin from '../../../../components/Admin/Report/ReportCard';
import ReportGraphAdmin from '../../../../components/Admin/Report/ReportGraph';
import ReportsAdminApiService from '../../../../services/api/ReportsAdminApiService';
import orderStatistcs from '../../../../services/utils/orderStatistics';
import './ReportsPage.css';

function ReportsPage(props) {
  const { match } = props;
  const [reportData, setReportData] = useState([]);

  const getReports = async () => {
    try {
      const resp = await ReportsAdminApiService.getByDate(match.params.id).then(
        (r) => r.data
      );
      if (resp.success) {
        setReportData([...resp.data]);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const statistics = useMemo(
    () => ({
      totalProducts: orderStatistcs.getTotalProducts(reportData),
      meanProducts: orderStatistcs.getMeanProducts(reportData),
      totalValue: orderStatistcs.getTotalValue(reportData),
      meanValue: orderStatistcs.getMeanValue(reportData),
      graphData: orderStatistcs.getGraphData(reportData, match.params.id),
    }),
    [reportData]
  );

  useEffect(() => {
    getReports();
  }, []);

  const valueData = [
    {
      title: 'Total das vendas do mês',
      value: `R$ ${statistics.totalValue}`,
    },
    {
      title: 'Valor médio das vendas p/ dia',
      value: `R$ ${statistics.meanValue}`,
    },
  ];

  const productsData = [
    {
      title: 'Total de produtos do mês',
      value: `R$ ${statistics.totalProducts}`,
    },
    {
      title: 'Média de produtos vendidos p/ dia',
      value: `R$ ${statistics.meanProducts}`,
    },
  ];

  return (
    <AdminContainer link="relatorios">
      <ButtonsForm path="/admin/relatorios/page/1" isReadOnly />
      <Container className="report-page-admin container">
        <ReportCardAdmin data={valueData} />
        <ReportGraphAdmin
          graphData={statistics.graphData}
          areaKey="valor"
          xKey="dia"
          title="Vendas do mês"
        />
        <ReportCardAdmin data={productsData} />
        <ReportGraphAdmin
          graphData={statistics.graphData}
          areaKey="produtos"
          xKey="dia"
          title="Quantidade de produtos vendidos"
        />
      </Container>
    </AdminContainer>
  );
}

export default ReportsPage;
