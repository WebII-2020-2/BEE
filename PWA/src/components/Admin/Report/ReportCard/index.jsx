import React from 'react';
import './ReportCard.css';

function ReportCardAdmin({ data }) {
  return (
    <div className="report-admin cards">
      {data.map(({ title, value }) => (
        <div className="report-admin card">
          <p>{title}</p>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default ReportCardAdmin;
