import * as yup from 'yup';

const validationShema = yup.object().shape({
  password: yup
    .string()
    .required('Nova senha não pode ser vazia')
    .min(4, 'Nova senha deve ter pelo menos 4 caracteres'),
  confirmationPassword: yup
    .string()
    .required('Confirmar senha não pode ser vazio')
    .oneOf([yup.ref('password')], 'Senhas não estão iguais'),
});

export default validationShema;
