const convert = (status) => {
  switch (status) {
    case 1:
      return 'Pedido efetuado';
    case 2:
      return 'Aguardando pagamento';
    case 3:
      return 'Pagamento efetuado';
    case 4:
      return 'Cancelado por falta de pagamento';
    case 5:
      return 'Preparando envio';
    case 6:
      return 'Pedido enviado';
    case 7:
      return 'Pedido entrege';
    case 8:
      return 'Pedido devolvido';
    default:
      return 'Cancelado';
  }
};

const orderStatus = {
  convert,
};

export default orderStatus;
