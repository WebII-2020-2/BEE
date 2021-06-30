import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './ReportGraph.css';

function ReportGraphAdmin(props) {
  const { graphData, areaKey, xKey, title } = props;

  return (
    <div className="report-admin graph">
      <p className="report-admin graph-title">{title}</p>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart width={500} height={200} data={graphData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f7ca00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f7ca00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xKey} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={areaKey}
            stroke="#fca311"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReportGraphAdmin;
