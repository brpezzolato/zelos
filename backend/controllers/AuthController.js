import jwt from 'jsonwebtoken';
import { read, compare } from '../config/database.js';
import { JWT_SECRET } from '../config/jwt.js'; // Importar a chave secreta

const loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const usuario = await read('usuarios', `email = '${username}'`);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta (comparar a senha enviada com o hash armazenado)
    const senhaCorreta = await compare(password, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    // Gerar o token JWT
    req.token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, {
      expiresIn: '1h',
    });

    next();
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

export { loginController };
