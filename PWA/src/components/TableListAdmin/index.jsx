import React from 'react';
import './TableListAdmin.css';

function TableList(props) {
  const { itens } = props;

  return (
    <table className="w-100 table table-list">
      <tbody>
        {itens.map((row) => (
          <tr key={row.id}>
            {Object.entries(row).map((item) => <td key={item[0]}>{item[1]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableList;
