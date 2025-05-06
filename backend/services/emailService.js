import nodemailer from 'nodemailer';
import getVerificationEmailHTML from '../templates/verificationEmailTemplate.js';
import getWelcomeEmailHTML from '../templates/welcomeTemplate.js';
import getPasswordResetEmailHTML from '../templates/passwordResetTemplate.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (nombre, email, verificationToken) => {
  // Asegúrate de que BASE_URL esté configurado correctamente en tu .env
  const verificationLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
  const html = getVerificationEmailHTML(nombre, verificationLink);

  const mailOptions = {
    from: '"Ecommerce Int" <no-reply@ecommerce-int.com>',
    to: email,
    subject: 'Verificá tu cuenta',
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email de verificación enviado');
    return true;
  } catch (error) {
    console.error('❌ Error al enviar email de verificación:', error);
    return false;
  }
};

const sendWelcomeEmail = async (nombre, email) => {
  const html = getWelcomeEmailHTML(nombre);

  const mailOptions = {
    from: '"Ecommerce Int" <no-reply@ecommerce-int.com>',
    to: email,
    subject: '¡Bienvenido a Ecommerce Int!',
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email de bienvenida enviado');
    return true;
  } catch (error) {
    console.error('❌ Error al enviar email de bienvenida:', error);
    return false;
  }
};

const sendPasswordResetEmail = async (nombre, email, token) => {
  const html = getPasswordResetEmailHTML(nombre, `http://localhost:3000/auth/reset-password/${token}`);

  const mailOptions = {
    from: '"Ecommerce Int" <no-reply@ecommerce-int.com>',
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
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail
};
