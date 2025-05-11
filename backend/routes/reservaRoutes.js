import express from 'express';
import { crearReserva, obtenerReservasPorUsuario } from '../controllers/reserva/reservaController.js';
import { isAuthenticated } from '../middleware/auth/authMiddleware.js';

const router = express.Router();

// Ruta para crear una nueva reserva
router.post('/reservas', isAuthenticated, crearReserva); // <- ¡Importante que isAuthenticated esté acá!

// Ruta para obtener todas las reservas de un usuario
router.get('/reservas/usuario/:usuario_id', obtenerReservasPorUsuario);

export default router;
