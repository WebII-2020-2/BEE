export default (date) =>
  new Date(date).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  });
