// import api from './api';

// const ENDPOINT_BASE = '/category';

/** traz todos */
function getAll() {
  // return api.get(`${ENDPOINT_BASE}/list`);
}

/** busca por ID */
function getById(id) {
  console.warn(id);
  // return api.get(`${ENDPOINT_BASE}/list/${id}`);
}

/** cria um novo */
function createNew(form) {
  console.warn(form);
  // return api.post(`${ENDPOINT_BASE}/add`, {
  //   ...form,
  // });
}

/** deleta */
function remove(id) {
  console.warn(id);
  // return api.post(`${ENDPOINT_BASE}/delete/${id}`);
}

/** atualiza */
function update(form, id) {
  console.warn(id);
  console.warn(form);
  // return api.post(`${ENDPOINT_BASE}/update/${id}`, {
  //   ...form,
  // });
}

const CategoryAdminApiService = {
  getAll,
  getById,
  createNew,
  remove,
  update,
};

export default CategoryAdminApiService;