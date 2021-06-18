import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório: Nome')
    .nullable(false)
    .max(100, 'Nome deve conter menos de 100 caracteres'),
  category: yup.number().required('Escolha uma categoria'),
  unity: yup
    .string()
    .required('Campo obrigatório: Unidade')
    .nullable(false)
    .max(100, 'Unidade deve conter menos de 100 caracteres'),
  quantity: yup
    .number()
    .required('Campo obrigatório: Quantidade')
    .positive('Quantidade deve ser maior que 0')
    .integer(),
  unitary_value: yup
    .number()
    .required('Campo obrigatório: Preço')
    .positive('Preço deve ser maior que 0'),
  image: yup.string().required('Campo obrigatório: Imagem').nullable(false),
  description: yup
    .string()
    .required('Campo obrigatório: Descrição')
    .nullable(false)
    .max(100, 'Descrição deve conter menos de 100 caracteres'),
});

export default validationSchema;
