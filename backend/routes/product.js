import express from 'express';
import { verifyToken } from '../middleware/auth/verifyToken.js';
import { checkRole } from '../middleware/auth/roleMiddleware.js';
import { getProducts, getProductBySku, addProduct, updateProduct, deleteProduct } from '../controllers/product/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:sku', getProductBySku);

// Cambiado de isAuthenticated a verifyToken
router.post('/products', verifyToken, checkRole('Admin'), addProduct);
router.put('/products/:sku', verifyToken, checkRole('Admin'), updateProduct);
router.delete('/products/:sku', verifyToken, checkRole('Admin'), deleteProduct);

export default router;
