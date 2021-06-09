import React from 'react';
import './TableListAdmin.css';

function TableList(props) {
  const { itens, tablehead } = props;

  const th = () => Object.values(tablehead).map((thValue) => (<th key={thValue}>{thValue}</th>));

  const filterTd = (row) => {
    const td = Object.entries(row).filter((item) => item[0] in tablehead);
    return td.map((t) => <td key={t[0]}>{t[1]}</td>);
  };

  const tr = () => itens.map((row) => (
    <tr key={row.id}>
      {filterTd(row)}
    </tr>
  ));

  return (
    <table className="w-100 table table-list">
      <thead>
        {th()}
      </thead>
      <tbody>
        {tr()}
      </tbody>
    </table>
  );
}

export default TableList;
