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

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Crear nuevo usuario
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      isVerified: true,  // Marcamos el usuario como verificado
      role: role || 'user',  // Si no se especifica un rol, le asignamos 'user'
    });

    // Crear el token de verificación para el nuevo usuario (lo necesitamos para el login)
    const verificationToken = jwt.sign(
      { id: newUser.id, email: newUser.email },  // Incluir el `id` y el `email` del nuevo usuario
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar el correo de bienvenida al usuario
    const emailSent = await emailService.sendWelcomeEmail(newUser.nombre, newUser.email);  // Función que envía el correo

    if (emailSent) {
      // Si el email fue enviado correctamente
      return res.status(201).json({
        msg: 'Usuario registrado exitosamente. ¡Bienvenido!',
        token: verificationToken,  // Devolver el token de verificación generado
      });
    } else {
      // Si hubo un error al enviar el email
      return res.status(500).json({ msg: 'Usuario creado, pero no se pudo enviar el email de bienvenida.' });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default { register };
