import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cart/cartController.js';
import { verifyToken } from '../middleware/auth/verifyToken.js';

const router = express.Router();

// Rutas protegidas: Requieren autenticación
router.use(verifyToken);


router.get('/', getCart);  
router.post('/', addToCart);   
router.delete('/:item_id', removeFromCart); 
router.delete('/', clearCart);  

export default router;
