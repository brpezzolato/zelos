import { leituraPatrimonios } from '../models/Patrimonios.js';

const listarPatrimoniosController = async (req, res) => {
  try {
    const patrimonios = await leituraPatrimonios();
    res.status(200).json(patrimonios);
  } catch (err) {
    console.error(`Erro ao listar patrimonios: `, err);
    res.status(500).json({ mensagem: 'Erro ao listar patrimonios' });
  }
};

export { listarPatrimoniosController };
