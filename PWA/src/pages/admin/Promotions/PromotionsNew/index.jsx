import React from 'react';
import AdminContainer from '../../../../components/Admin/Container';
import FormPromotionAdmin from '../../../../components/Admin/FormPromotion';

function PromotionsNew() {
  return (
    <AdminContainer link="promocoes">
      <FormPromotionAdmin isNew />
    </AdminContainer>
  );
}

export default PromotionsNew;
