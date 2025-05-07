import nodemailer from 'nodemailer';
import getWelcomeEmailHTML from '../templates/welcomeTemplate.js';
import getPasswordResetEmailHTML from '../templates/passwordResetTemplate.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Función para enviar el correo de bienvenida
const sendWelcomeEmail = async (nombre, email) => {
  const mailOptions = {
    from: `"Pilates Studio" <${process.env.EMAIL_USER}>`,  
    to: email,
    subject: '¡Bienvenido a Pilates Studio!',
    html: getWelcomeEmailHTML(nombre),  // Utiliza el HTML del correo de bienvenida
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de bienvenida enviado:', info.response);
    return true;
  } catch (err) {
    console.error('Error enviando el correo:', err);
    return false;
  }
};

// Función para enviar el correo de restablecimiento de contraseña
const sendPasswordResetEmail = async (nombre, email, token) => {
  // Usamos una URL para el restablecimiento de contraseña
  const html = getPasswordResetEmailHTML(nombre, `http://localhost:3000/auth/reset-password/${token}`);

  const mailOptions = {
    from: '"Pilates Studio" <no-reply@pilatesstudio.com>',  // Actualizamos el remitente a Pilates Studio
    to: email,
    subject: 'Restablecé tu contraseña',
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email de restablecimiento enviado');
    return true;
  } catch (error) {
    console.error('❌ Error al enviar email de restablecimiento:', error);
    return false;
  }
};

export default {
  sendWelcomeEmail,
  sendPasswordResetEmail
};
