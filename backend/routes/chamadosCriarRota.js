import express from 'express';
import { criarChamadoController } from '../controllers/ChamadoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', criarChamadoController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'POST');
  res.status(204).send();
});

export default router;
