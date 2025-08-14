import express from 'express';
import { listarPatrimoniosController } from '../controllers/PatrimoniosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', listarPatrimoniosController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET');
  res.status(204).send();
});

export default router;
