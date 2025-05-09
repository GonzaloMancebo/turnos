import { Router } from 'express';
import { getTodasClases, getClasesPorDia, getClaseById } from '../controllers/clase/claseController.js'; 

const router = Router();

// Ruta para obtener todas las clases
router.get('/clases', getTodasClases);

// Ruta para obtener clases por día específico
router.get('/clases/dia', getClasesPorDia);

// Ruta para obtener una clase por ID
router.get('/clase/:id', getClaseById);

export default router;
