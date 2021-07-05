import React from 'react';
import StoreContainer from '../../../../components/Shared/StoreContainer';

function PromotionPage(props) {
  const { match } = props;
  return (
    <StoreContainer title="Promoção Tal">
      Promoção {match.params.id}
    </StoreContainer>
  );
}

export default PromotionPage;
