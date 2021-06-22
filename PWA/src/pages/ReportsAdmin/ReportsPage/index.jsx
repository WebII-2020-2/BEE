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
    totalProducts: 0,
    meanProducts: 0,
    totalValue: 0,
    meanValue: 0,
    graphData: [],
  });

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

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    setStatistics({
      totalProducts: orderStatistcs.getTotalProducts(reportData),
      meanProducts: orderStatistcs.getMeanProducts(reportData),
      totalValue: orderStatistcs.getTotalValue(reportData),
      meanValue: orderStatistcs.getMeanValue(reportData),
      graphData: orderStatistcs.getGraphData(reportData, match.params.id),
    });
  }, [reportData]);

  return (
    <AdminContainer link="relatorios">
      <ButtonsFormAdmin path="/admin/relatorios" isReadOnly />
      <Container className="report-page-admin container">
        <div className="report-page-admin cards">
          <div className="report-page-admin card">
            <p>Total das vendas do mês</p>
            <span>R$ {statistics.totalValue}</span>
          </div>
          <div className="report-page-admin card">
            <p>Média das vendas p/ dia</p>
            <span>R$ {statistics.meanValue}</span>
          </div>
        </div>

        <div className="report-page-admin graph">
          <p className="report-page-admin title">Vendas do mês</p>
          <AreaChart width={500} height={200} data={statistics.graphData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f7ca00" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f7ca00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="dia" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip filterNull label="lalala" />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#fca311"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>

        <div className="report-page-admin cards">
          <div className="report-page-admin card">
            <p>Total de produtos do mês</p>
            <span>{statistics.totalProducts}/un</span>
          </div>
          <div className="report-page-admin card">
            <p>Média de produtos p/ dia</p>
            <span>{statistics.meanProducts}/un</span>
          </div>
        </div>

        <div className="report-page-admin graph">
          <p className="report-page-admin title">
            Quantidade de produtos vendidos
          </p>
          <AreaChart width={500} height={200} data={statistics.graphData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f7ca00" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f7ca00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="dia" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="produtos"
              stroke="#fca311"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
      </Container>
    </AdminContainer>
  );
}

export default ReportsPage;
