import emailService from '../../services/emailService.js'; 
import crypto from 'crypto';

// Función para enviar el correo de verificación a un email específico (para probar la plantilla)
const testSendVerificationEmail = async (req, res) => {
  const nombre = 'Administrador'; 
  const email = 'mancebo.gonzalo27@gmail.com';  
    const verificationToken = crypto.randomBytes(32).toString('hex'); // Genera un token aleatorio para la verificación

  const enviado = await emailService.sendVerificationEmail(nombre, email, verificationToken);

  if (enviado) {
    return res.json({ msg: 'Correo de verificación enviado a ' + email });
  } else {
    return res.status(500).json({ msg: 'Hubo un error al enviar el correo' });
  }
};

// Función similar para probar el correo de bienvenida
const testSendWelcomeEmail = async (req, res) => {
    const nombre = 'Pol Fernandez'; 
    const email = 'paulfernandez4444@gmail.com';  
  
  const enviado = await emailService.sendWelcomeEmail(nombre, email);

  if (enviado) {
    return res.json({ msg: 'Correo de bienvenida enviado a ' + email });
  } else {
    return res.status(500).json({ msg: 'Hubo un error al enviar el correo' });
  }
};

// Función similar para probar el correo de restablecimiento de contraseña
const testSendPasswordResetEmail = async (req, res) => {
  const nombre = 'Pol Fernandez'; 
    const email = 'paulfernandez4444@gmail.com';  
  const resetToken = crypto.randomBytes(32).toString('hex'); // Genera un token aleatorio para el restablecimiento

  const enviado = await emailService.sendPasswordResetEmail(nombre, email, resetToken);

  if (enviado) {
    return res.json({ msg: 'Correo de restablecimiento enviado a ' + email });
  } else {
    return res.status(500).json({ msg: 'Hubo un error al enviar el correo' });
  }
};

export default { testSendVerificationEmail, testSendWelcomeEmail, testSendPasswordResetEmail };
