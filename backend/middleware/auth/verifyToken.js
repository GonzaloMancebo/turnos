import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.warn('Token no proporcionado');
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error al verificar token:', err.message);
      return res.status(403).json({ msg: 'Token inválido o expirado' });
    }

    req.user = decoded;
    next();
  });
};
