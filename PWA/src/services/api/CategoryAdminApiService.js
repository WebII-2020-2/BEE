// import api from './api';

// const ENDPOINT_BASE = '/example';

let categories = [
  { id: 1, name: 'Grãos', description: 'Grãos são dahora' },
  { id: 2, name: 'Laticinios', description: '' },
];

/** traz todos */
function getAll() {
  return categories;
}

/** busca por ID */
function getById(id) {
  return categories.find((category) => category.id === Number(id));
}

/** cria um novo */
function createNew(form) {
  categories.push({
    ...form,
  });
  return 'SUCCESS';
}

/** deleta */
function remove(id) {
  categories = categories.filter((category) => category.id !== id);
  return 'SUCCESS';
}

/** atualiza */
function update(form) {
  remove(form.id);

  categories.push({
    ...form,
  });
  return 'SUCCESS';
}

const CategoryAdminApiService = {
  getAll,
  getById,
  createNew,
  remove,
  update,
};

export default CategoryAdminApiService;
