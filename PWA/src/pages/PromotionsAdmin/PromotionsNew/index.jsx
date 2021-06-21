import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormPromotionAdmin from '../../../components/FormPromotionAdmin';

function PromotionsNew() {
  return (
    <AdminContainer link="promocoes">
      <FormPromotionAdmin isNew />
    </AdminContainer>
  );
}

export default PromotionsNew;
