import { criarChamado, leituraChamados } from '../models/CriarChamado.js';

const criarChamadoController = async (req, res) => {
  try {
    const { titulo, descricao, patrimonio, tipo } = req.body;
    const usuario = req.usuarioId || 1;

    const chamadosExistentes = await leituraChamados(patrimonio, tipo);

    if (chamadosExistentes.length > 0) {
      console.log(
        'Não foi possível criar seu chamado, pois já existe um registro para este mesmo patrimônio e tipo solicitado em aberto.'
      );
      return res.status(409).json({
        mensagem:
          'Não foi possível criar seu chamado, pois já existe um registro para este mesmo patrimônio e tipo solicitado em aberto.',
      });
    }

    const chamadoData = {
      titulo: titulo,
      descricao: descricao,
      patrimonio: patrimonio,
      tipo_id: tipo,
      usuario_id: usuario,
    };

    const chamadoId = await criarChamado(chamadoData);
    res.status(201).json({ mensagem: 'Chamado criado com sucesso', chamadoId });
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ mensagem: 'Erro ao criar chamado' });
  }
};

export { criarChamadoController };
