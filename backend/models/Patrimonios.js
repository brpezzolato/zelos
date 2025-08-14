import { readAll } from '../config/database.js';

const leituraPatrimonios = async () => {
  try {
    return await readAll('equipamentos');
  } catch (error) {
    console.error('Erro ao obter consultas:', error);
    throw error;
  }
};

export { leituraPatrimonios };
