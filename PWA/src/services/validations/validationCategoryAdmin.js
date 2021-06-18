import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório: Nome').nullable(false),
  description: yup
    .string()
    .required('Campo obrigatório: Descrição')
    .nullable(false),
});

export default validationSchema;
