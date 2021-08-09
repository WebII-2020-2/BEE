import axios from 'axios';
import api from './api';

const ENDPOINT_BASE = '/address';

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
function update(form, id) {
  return api.post(`${ENDPOINT_BASE}/update/${id}`, {
    ...form,
  });
}

function getViaCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

const AddressApiService = {
  getAll,
  getById,
  createNew,
  remove,
  update,
  getViaCep,
};

export default AddressApiService;
