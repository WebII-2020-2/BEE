import api from './api';

const ENDPOINT_BASE = '/example';

/** traz todos */
function getAll() {
  return api.get(`${ENDPOINT_BASE}`);
}

/** busca por ID */
function getById(id) {
  return api.get(`${ENDPOINT_BASE}/${id}`);
}

/** cria um novo */
function createNew(form) {
  return api.post(`${ENDPOINT_BASE}/create`,
    {
      ...form,
    });
}

/** atualiza */
function updateOne(id, form) {
  return api.put(`${ENDPOINT_BASE}/updade/${id}`,
    {
      ...form,
    });
}

function removeOne(id) {
  return api.delete(`${ENDPOINT_BASE}/delete/${id}`);
}

const ExampleApiService = {
  getAll,
  getById,
  createNew,
  updateOne,
  removeOne,
};

export default ExampleApiService;
