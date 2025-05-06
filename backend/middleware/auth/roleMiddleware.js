// middleware/roleMiddleware.js
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Ahora accedemos al usuario desde el token JWT

    if (!user) {
      return res.status(401).json({ message: 'No has iniciado sesión.' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso.' });
    }

    next(); 
  };
};
