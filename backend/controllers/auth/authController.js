import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: 'Correo o contraseña incorrectos' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: 'Debes verificar tu cuenta antes de iniciar sesión.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      msg: 'Login exitoso',
      usuario: user.nombre,
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
};

const logout = (req, res) => {
  return res.json({ msg: 'Logout exitoso. Eliminá el token del lado del cliente.' });
};

const status = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true, usuario: decoded.email });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: 'La cuenta ya está verificada' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ msg: 'Cuenta verificada exitosamente' });
  } catch (err) {
    return res.status(400).json({ msg: 'Token no válido o expirado' });
  }
};

export default {
  login,
  logout,
  status,
  verifyEmail
};
