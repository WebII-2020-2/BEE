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
function create(form) {
  return api.post(`${ENDPOINT_BASE}/create`, {
    ...form,
  });
}

/** atualiza */
function update(id, form) {
  return api.post(`${ENDPOINT_BASE}/update/${id}`, {
    ...form,
  });
}

function remove(id) {
  return api.delete(`${ENDPOINT_BASE}/delete/${id}`);
}

const ExampleApiService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default ExampleApiService;
