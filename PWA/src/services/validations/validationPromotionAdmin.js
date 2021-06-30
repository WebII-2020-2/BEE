import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório: Nome')
    .nullable(false)
    .max(100, 'Nome deve conter menos de 100 caracteres'),
  start_date: yup
    .date()
    .required('Campo obrigatório: Data de início')
    .min(new Date(), 'Data de início deve ser a partir de hoje'),
  end_date: yup.date().required('Campo obrigatório: Data de fim'),
  value: yup
    .number()
    .required('Campo obrigatório: Valor')
    .positive('Valor deve ser maior que 0'),
});

export default validationSchema;
