import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsFormAdmin from '../../../components/ButtonsFormAdmin';
import ReportsAdminApiService from '../../../services/api/ReportsAdminApiService';
import orderStatistcs from '../../../services/utils/orderStatistics';
import './ReportsPage.css';

function ReportsPage(props) {
  const { match } = props;
  const [reportData, setReportData] = useState([]);
  const [statistics, setStatistics] = useState({
    mpvDay: 0,
    totalProducts: 0,
    totalValue: 0,
    graphData: [],
  });

  const getReports = async () => {
    try {
      const resp = await ReportsAdminApiService.getByDate(match.params.id).then(
        (r) => r.data
      );
      console.warn(resp.data);

      if (resp.success) {
        setReportData([...resp.data]);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    setStatistics({
      mpvDay: orderStatistcs.getMVPDay(reportData),
      totalProducts: orderStatistcs.getTotalProducts(reportData),
      totalValue: orderStatistcs.getTotalValue(reportData),
      graphData: orderStatistcs.getGraphData(reportData, match.params.id),
    });
  }, [reportData]);

  return (
    <AdminContainer link="relatorios">
      <ButtonsFormAdmin path="/admin/relatorios" isReadOnly />
      <Container>
        <h1>
          {`Total Vendas: ${statistics.totalValue} - Total Produtos Vendidos: ${statistics.totalProducts} - Melhor Dia: ${statistics.mpvDay}`}
        </h1>
        <AreaChart
          width={730}
          height={250}
          data={statistics.graphData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          l
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="dia" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip filterNull label="lalala" />
          <Area
            type="monotone"
            dataKey="valor"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
        <AreaChart
          width={730}
          height={250}
          data={statistics.graphData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="dia" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="produtos"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </Container>
    </AdminContainer>
  );
}

export default ReportsPage;
