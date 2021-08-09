import * as yup from 'yup';
import AddressApiService from '../api/AddressApiService';

const validateCEP = async (cep) => {
  if (cep && cep.length === 8) {
    try {
      const resp = await AddressApiService.getViaCep(cep).then((r) => r.data);
      if (resp.erro) {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  return true;
};

const validationSchema = yup.object().shape({
  zip_code: yup
    .string()
    .required('CEP não pode ser vazio')
    .nullable(false)
    .test('CEP válido', 'CEP não é válido', (value) => validateCEP(value))
    .length(8, 'CEP deve ter 8 números'),
  public_place: yup
    .string()
    .required('Rua / Avenida não pode estar vazia')
    .nullable(false)
    .max(100, 'Rua / Avenida deve ter menos de 100 caracteres'),
  number: yup.string().max(5, 'Número deve ter no máximo 5 números'),
  district: yup
    .string()
    .required('Bairro não pode ser vazio')
    .nullable(false)
    .max(100, 'Bairro deve ter menos de 100 caracteres'),
  city: yup
    .string()
    .required('Cidade não pode ser vazia')
    .nullable(false)
    .max(100, 'Cidade deve ter menos de 100 caracteres'),
  state: yup
    .string()
    .required('Estado não pode ser vazia')
    .nullable(false)
    .length(2, 'Estado deve ter 2 caracteres'),
  complement: yup
    .string()
    .max(100, 'Complemento deve ter menos de 100 caracteres'),
  reference_point: yup
    .string()
    .max(100, 'Ponto de referência deve ter menos de 100 caracteres'),
});

export default validationSchema;
