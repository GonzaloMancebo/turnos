import express from 'express';
import authController from '../controllers/auth/authController.js';
import registerController from '../controllers/auth/registerController.js';
import testController from '../controllers/email/emailTestController.js';
import userController from '../controllers/user/userController.js';
import { isAuthenticated } from '../middleware/auth/authMiddleware.js';
import { validateRegister, validateLogin } from '../middleware/validators/authValidator.js';
import { handleValidation } from '../middleware/validators/handleValidation.js';

const router = express.Router();

// Auth
router.post('/login', validateLogin, handleValidation, authController.login);
router.get('/logout', authController.logout);
router.get('/status', authController.status);

// Register
router.post('/register', validateRegister, handleValidation, registerController.register);

// Perfil
router.get('/perfil', isAuthenticated, userController.perfil); // Obtener el perfil
router.put('/perfil', isAuthenticated, userController.updatePerfil); // Actualizar el perfil
router.delete('/perfil', isAuthenticated, userController.deleteUser); // Eliminar la cuenta


// Email test
router.post('/test/welcome-email', testController.testSendWelcomeEmail);
router.post('/test/reset-password-email', testController.testSendPasswordResetEmail);

export default router;
