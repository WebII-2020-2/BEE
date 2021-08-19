import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

const phoneRegex = new RegExp(/(\(?\d{2}\)?\s?)?(\d{4,5})-?(\d{4})/g);

const validationSchemaData = yup.object().shape({
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
  cpf: yup
    .string()
    .required('CPF não pode ser vazio')
    .length(11, 'CPF deve ter 11 números')
    .test('CPF válido', 'CPF não é válido', (value) => cpf.isValid(value)),
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

const validationSchemaPassword = yup.object().shape({
  new_password: yup
    .string()
    .required('Nova senha não pode ser vazia')
    .min(4, 'Nova senha deve ter pelo menos 4 caracteres'),
  confirmationPassword: yup
    .string()
    .required('Confirmar senha não pode ser vazio')
    .oneOf([yup.ref('new_password')], 'Senhas não estão iguais'),
});

const validationShema = {
  validationSchemaData,
  validationSchemaPassword,
};

export default validationShema;
