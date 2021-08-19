import * as yup from 'yup';
import cardValidator from 'card-validator-jess';

const validateCardFlag = (cardNumber) => {
  const visa = /^4[0-9]{15}$/;
  const masterCard = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{14}$/;
  if (visa.test(cardNumber)) return true;
  if (masterCard.test(cardNumber)) return true;
  return false;
};

const validationSchema = yup.object().shape({
  number: yup
    .string()
    .required('Número do cartão não pode ser vazio')
    .nullable(false)
    .length(16, 'Número do cartão deve 16 números')
    .test(
      'Bandeira váida',
      'Válidos somente número de cartão da Visa ou MasterCard',
      (value) => validateCardFlag(value)
    )
    .test('Número válido', 'Número não é válido', (value) => {
      if (value && value.length === 16)
        return cardValidator.cardValidator(Number(value));
      return false;
    }),
  security_code: yup
    .string()
    .required('Código de segurança não pode ser vazio')
    .length(3, 'Código de segurança deve ter 3 números'),
  expiration_date: yup
    .date()
    .typeError('Data de expiração não pode ser vazia')
    .required('Data de expiração não pode ser vazia')
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'A data de expiração deve ser maior que esse mês'
    )
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() + 8)),
      'A data de expiração não pode passar de 8 anos'
    ),
  holder: yup
    .string()
    .required('Nome não pode ser vazio')
    .nullable(false)
    .max(100, 'Nome deve ter menos de 100 caracteres'),
});

export default validationSchema;
