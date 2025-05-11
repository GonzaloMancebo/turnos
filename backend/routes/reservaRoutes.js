import express from 'express';
import { crearReserva, obtenerReservasPorUsuario, eliminarReserva } from '../controllers/reserva/reservaController.js';
import { isAuthenticated } from '../middleware/auth/authMiddleware.js';

const router = express.Router();

// Ruta para crear una nueva reserva
router.post('/reservas', isAuthenticated, crearReserva); 

// Ruta para obtener todas las reservas de un usuario
router.get('/reservas/usuario/:usuario_id', isAuthenticated, obtenerReservasPorUsuario);

// Ruta para eliminar una reserva
router.delete('/reservas/:turno_id', isAuthenticated, eliminarReserva);


export default router;
