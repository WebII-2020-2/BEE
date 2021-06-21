import api from './api';

const ENDPOINT_BASE = '/order';

/** traz todos */
function getAll() {
  return api.get(`${ENDPOINT_BASE}/list`);
}

/** busca por ID */
function getById(id) {
  return api.get(`${ENDPOINT_BASE}/list/${id}`);
}

/** atualiza */
function update(id, form) {
  return api.post(`${ENDPOINT_BASE}/update/${id}`, {
    ...form,
  });
}

const ExampleApiService = {
  getAll,
  getById,
  update,
};

export default ExampleApiService;
