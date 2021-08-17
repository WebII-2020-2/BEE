import api from './api';

const ENDPOINT_BASE = '/shipping';

function getShippingInfo(cep) {
  return api.get(`${ENDPOINT_BASE}?cep_destino=${cep}`);
}

const ShippingApiService = {
  getShippingInfo,
};

export default ShippingApiService;
