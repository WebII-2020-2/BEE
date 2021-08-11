import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ListProducts from '../../../components/Shared/ListProducts';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CampaignAdminApiService from '../../../services/api/CampaignApiService';

function Campaign(props) {
  const { match } = props;
  const [campaignData, setCampaignData] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  const getCampaignData = async () => {
    setLoadingData(true);
    try {
      const resp = await CampaignAdminApiService.getById(match.params.id)
        .then((r) => r.data)
        .catch((r) => r.response.data);

      if (resp.success) {
        setCampaignData(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getCampaignData();
  }, []);

  return (
    <StoreContainer title="Promoção Tal">
      <Container className="products-container">
        <div className="category-info">
          <h1>{campaignData.title}</h1>
          <p>{campaignData.description}</p>
          <hr />
        </div>
        <ListProducts
          productsData={campaignData.product}
          loadingData={loadingData}
        />
      </Container>
    </StoreContainer>
  );
}

export default Campaign;
