import api from './api';

const ENDPOINT_BASE = '/product';

/** traz todos */
function getAll() {
  return api.get(`${ENDPOINT_BASE}/list`);
}

/** busca por ID */
function getById(id) {
  return api.get(`${ENDPOINT_BASE}/list/${id}`);
}

/** cria um novo */
function create(form) {
  return api.post(`${ENDPOINT_BASE}/add`, {
    ...form,
  });
}

/** atualiza */
function update(form) {
  return api.post(`${ENDPOINT_BASE}/update`, {
    ...form,
  });
}

function remove(id) {
  return api.post(`${ENDPOINT_BASE}/delete`, {
    id,
  });
}

const ProductAdminApiService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default ProductAdminApiService;
