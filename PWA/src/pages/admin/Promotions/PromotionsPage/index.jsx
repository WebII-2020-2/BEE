import React from 'react';
import AdminContainer from '../../../../components/Admin/Container';
import FormPromotionAdmin from '../../../../components/Admin/FormPromotion';

function PromotionsPage(props) {
  const { match } = props;

  return (
    <AdminContainer link="promocoes">
      <FormPromotionAdmin promotionId={match.params.id} isNew={false} />
    </AdminContainer>
  );
}

export default PromotionsPage;
