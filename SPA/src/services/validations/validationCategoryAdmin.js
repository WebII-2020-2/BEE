import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório: Nome')
    .nullable(false)
    .max(100, 'Nome deve conter menos de 100 caracteres'),
  description: yup
    .string()
    .required('Campo obrigatório: Descrição')
    .nullable(false),
});

export default validationSchema;
