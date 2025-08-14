import express from 'express';
import {
  criarChamadoController,
  listarChamadosController,
} from '../controllers/ChamadoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', listarChamadosController);

router.post('/', authMiddleware, criarChamadoController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'POST');
  res.status(204).send();
});

export default router;
