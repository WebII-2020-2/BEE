import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import TableListAdmin from '../../../components/TableListAdmin';

function CategoriesList() {
  const categories = [{ id: 1, nome: 'Grãos', qtdprodutos: 150 },
    { id: 2, nome: 'Laticinios', qtdprodutos: 41 }];

  return (
    <AdminContainer link="categorias">
      <ButtonsListAdmin link="/admin/categorias/novo" />
      <TableListAdmin itens={categories} />
    </AdminContainer>
  );
}

export default CategoriesList;
