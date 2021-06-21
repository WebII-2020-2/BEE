import React from 'react';
import AdminContainer from '../../../components/AdminContainer';
import FormPromotionAdmin from '../../../components/FormPromotionAdmin';

function PromotionsPage(props) {
  const { match } = props;

  return (
    <AdminContainer link="promocoes">
      <FormPromotionAdmin promotionId={match.params.id} isNew={false} />
    </AdminContainer>
  );
}

export default PromotionsPage;
