import api from './api';

const ENDPOINT_BASE = '/promotion';

/** traz todos */
function getAll() {
  return api.get(`${ENDPOINT_BASE}/list`);
}

/** busca por ID */
function getById(id) {
  return api.get(`${ENDPOINT_BASE}/list/${id}`);
}

/** cria um novo */
function createNew(form) {
  return api.post(`${ENDPOINT_BASE}/add`, {
    ...form,
  });
}

/** deleta */
function remove(id) {
  return api.post(`${ENDPOINT_BASE}/delete/${id}`);
}

/** atualiza */
function update(id, form) {
  return api.post(`${ENDPOINT_BASE}/update/${id}`, {
    ...form,
  });
}

const PromotionAdminApiService = {
  getAll,
  getById,
  createNew,
  remove,
  update,
};

export default PromotionAdminApiService;
