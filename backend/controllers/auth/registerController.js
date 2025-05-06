import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/user/User.js';
import emailService from '../../services/emailService.js';

const register = async (req, res) => {
  const { nombre, email, password, role } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ msg: 'Completa todos los campos' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'Este correo ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    // Crear nuevo usuario
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      isVerified: false,
      role: role || 'user',
    });

    // Crear el token de verificación para el nuevo usuario
    const verificationToken = jwt.sign(
      { id: newUser.id, email: newUser.email },  // Incluir el `id` del nuevo usuario generado automáticamente
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar email de verificación
    const emailSent = await emailService.sendVerificationEmail(nombre, email, verificationToken);

    if (emailSent) {
      return res.status(201).json({
        msg: 'Registro exitoso. Verificá tu email.',
        token: verificationToken,  // Devolver el token de verificación
      });
    } else {
      return res.status(500).json({ msg: 'Usuario creado, pero no se pudo enviar el email' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default { register };
