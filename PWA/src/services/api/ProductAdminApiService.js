// import api from './api';
import imagemProduto from '../../assets/img/mock-data-product.svg';

// const ENDPOINT_BASE = '/example';

let products = [
  {
    id: 1,
    image: imagemProduto,
    name: 'Amendoim',
    price: 40.5,
    category: 'Grãos',
    quantity: 8,
    weight: 2.5,
    weightUnity: 'Kg',
  },
  {
    id: 3123,
    image: imagemProduto,
    name: 'Amendoim',
    price: 40.5,
    category: 'Grãos',
    quantity: 8,
    weight: 2.5,
    weightUnity: 'Kg',
  },
  {
    id: 12212,
    image: imagemProduto,
    name: 'Amendoim',
    price: 40.5,
    category: 'Grãos',
    quantity: 8,
    weight: 2.5,
    weightUnity: 'Kg',
  },
  {
    id: 52352,
    image: imagemProduto,
    name: 'Amendoim',
    price: 40.5,
    category: 'Grãos',
    quantity: 8,
    weight: 2.5,
    weightUnity: 'Kg',
  },
];

/** traz todos */
function getAll() {
  return products;
}

/** busca por ID */
function getById(id) {
  return products.find((product) => product.id === Number(id));
}

/** cria um novo */
function createNew(form) {
  products.push({
    ...form,
  });
  return 'SUCCESS';
}

/** deleta */
function remove(id) {
  const tempProducts = products;
  products = [];
  tempProducts.forEach((product) => {
    if (product.id !== id) {
      products.push(product);
    }
  });
  return 'SUCCESS';
}

/** atualiza */
function update(form) {
  remove(form.id);

  products.push({
    ...form,
  });
  return 'SUCCESS';
}

const ProductAdminApiService = {
  getAll,
  getById,
  createNew,
  remove,
  update,
};

export default ProductAdminApiService;
