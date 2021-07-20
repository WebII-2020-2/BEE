import * as yup from 'yup';

const phoneRegex = new RegExp(/(\(?\d{2}\)?\s?)?(\d{4,5})-?(\d{4})/g);

const validationShema = yup.object().shape({
  name: yup
    .string()
    .required('Nome não pode ser vazio')
    .nullable(false)
    .max(100, 'Nome deve ter menos de 100 caracteres'),
  email: yup
    .string()
    .required('E-mail não pode ser vazio')
    .email('E-mail não é válido')
    .max(100, 'E-mail deve ter menos de 100 caracteres'),
  password: yup
    .string()
    .required('Senha não pode ser vazia')
    .min(4, 'Senha deve ter pelo menos 4 caracteres'),
  cpf: yup
    .string()
    .required('CPF não pode ser vazio')
    .length(11, 'CPF não é válido'),
  phone: yup
    .string()
    .required('Telefone não pode ser vazio')
    .matches(phoneRegex, 'Telefone não é válido')
    .max(15, 'Telefone não é válido'),
  birth_date: yup
    .date()
    .typeError('Data de nascimento não pode ser vazia')
    .required('Data de nascimento não pode ser vazia')
    .min(
      new Date(new Date().setFullYear(new Date().getFullYear() - 90)),
      'A idade máxima é 90 anos'
    )
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 16)),
      'A idade mínima é 16 anos'
    ),
});

export default validationShema;
