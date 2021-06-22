// import api from './api';

// const ENDPOINT_BASE = '/category';
const promocoes = [
  {
    id: 1,
    name: 'Dia das mães',
    start_date: '2020-06-12',
    end_date: '2020-07-12',
    type: 1,
    value: 15,
  },
  {
    id: 2,
    name: 'Natal',
    start_date: '2021-12-25',
    end_date: '2020-12-30',
    type: 2,
    value: 20,
  },
];
/** traz todos */
function getAll() {
  // return api.get(`${ENDPOINT_BASE}/list`);
  return promocoes;
}

/** busca por ID */
function getById(id) {
  return promocoes.filter((e) => e.id === id);
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
