import api from './api';

const ENDPOINT_BASE = '/reports';

/** traz todos */
function getAll() {
  return api.get(`${ENDPOINT_BASE}/list`);
}

/** busca por data mm-aaaa */
function getByDate(date) {
  return api.get(`${ENDPOINT_BASE}/list/${date}`);
}

const ExampleApiService = {
  getAll,
  getByDate,
};

export default ExampleApiService;
