import express from 'express';
import { checkout } from '../controllers/orders/checkout.js';
import { getOrderHistory} from '../controllers/orders/getOrderHistory.js';
import { updateOrderStatus } from '../controllers/orders/updateOrderStatus.js';
import { verifyToken } from '../middleware/auth/verifyToken.js';

const router = express.Router();

// Ruta protegida para realizar el checkout (finalizar compra)
router.post('/checkout', verifyToken, checkout);

// Ruta protegida para obtener el historial de pedidos
router.get('/history', verifyToken, getOrderHistory);

// Ruta protegida para actualizar el estado de la orden (solo para administradores)
router.put('/update-status', verifyToken, updateOrderStatus);

export default router;
