import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Campo obrigatório: Título')
    .nullable(false)
    .max(100, 'Título deve conter menos de 100 caracteres'),
  description: yup
    .string()
    .required('Campo obrigatório: Descrição')
    .nullable(false),
  image: yup.string().required('Campo obrigatório: Imagem').nullable(false),
});

export default validationSchema;
