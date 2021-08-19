import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório: Nome')
    .nullable(false)
    .max(100, 'Nome deve conter menos de 100 caracteres'),
  start_date: yup
    .date()
    .typeError('Campo obrigatório: Data de início')
    .required('Campo obrigatório: Data de início')
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'Data de início deve ser a partir de hoje'
    ),
  end_date: yup
    .date()
    .typeError('Campo obrigatório: Data de fim')
    .required('Campo obrigatório: Data de fim')
    .min(
      yup.ref('start_date'),
      'Data de fim deve ser maior que data de início'
    ),
  value: yup
    .number()
    .required('Campo obrigatório: Valor')
    .positive('Valor deve ser maior que 0'),
});

export default validationSchema;
