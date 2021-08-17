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

function getAllUser() {
  return api.get(`${ENDPOINT_BASE}/user/list`);
}

function getByIdUser(id) {
  return api.get(`${ENDPOINT_BASE}/user/list/${id}`);
}

function createNew(form) {
  return api.post(`${ENDPOINT_BASE}/add`, {
    ...form,
  });
}

const ExampleApiService = {
  getAll,
  getById,
  update,
  getAllUser,
  getByIdUser,
  createNew,
};

export default ExampleApiService;
