import { body, validationResult } from 'express-validator';

// Funciones de validación para el registro
export const validateRegister = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  // Si hay errores, los devuelve
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // Si no hay errores, pasamos al siguiente middleware o controlador
  }
];

// Funciones de validación para el login
export const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),

  // Si hay errores, los devuelve
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // Si no hay errores, pasamos al siguiente middleware o controlador
  }
];
