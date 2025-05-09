import express from 'express';
import  {getTurnosPorFecha}  from '../controllers/turno/turnoController.js';

const router = express.Router();

router.get('/turnos/:claseId', getTurnosPorFecha);

export default router;
