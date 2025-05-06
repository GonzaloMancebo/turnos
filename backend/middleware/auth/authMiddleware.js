import jwt from 'jsonwebtoken';
import User from '../../models/user/User.js';

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  

  if (!token) {
    return res.status(403).json({ msg: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Verificamos el token usando el JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos al usuario por el ID que viene en el token
    const user = await User.findByPk(decoded.id);  // Asegúrate de que el ID está en el token

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Si el usuario existe, lo agregamos a req.user
    req.user = user;
    next();  // Continuamos con la ejecución de la siguiente función/middleware
  } catch (err) {
    return res.status(401).json({ msg: 'Token no válido o expirado.' });
  }
};
