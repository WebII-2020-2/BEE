import React from 'react';
import { useHistory } from 'react-router-dom';

import './TableListAdmin.css';

function TableList(props) {
  const { itens, tableHead, linkEdit } = props;

  const history = useHistory();

  const handleCLickEdit = (id) => {
    history.push(`${linkEdit}/${id}`);
  };

  const th = () =>
    Object.values(tableHead).map((thValue) => <th key={thValue}>{thValue}</th>);

  const filterTd = (row) => {
    const td = Object.entries(row).filter((item) => item[0] in tableHead);
    return td.map((t) => <td key={t[0]}>{t[1]}</td>);
  };

  const tr = () =>
    itens.map((row) => (
      <tr key={row.id} onClick={() => handleCLickEdit(row.id)}>
        {filterTd(row)}
      </tr>
    ));

  return (
    <div className="admin-container table">
      <table className="w-100 table table-list table-hover">
        <thead>
          <tr>{th()}</tr>
        </thead>
        <tbody>{tr()}</tbody>
      </table>
    </div>
  );
}

export default TableList;
