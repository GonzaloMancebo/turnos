const getVerificationEmailHTML = (nombre, verificationLink) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
      <div style="background-color: #2d3748; padding: 20px; text-align: center;">
        <img src="https://i.imgur.com/O7pWhBv.png" alt="Ecommerce Int" style="height: 50px; margin-bottom: 10px;">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Ecommerce Int</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #2d3748;">¡Hola ${nombre}!</h2>
        <p style="font-size: 16px; color: #4a5568;">Gracias por registrarte en <strong>Ecommerce Int</strong>.</p>
        <p style="font-size: 16px; color: #4a5568;">Para verificar tu cuenta, hacé clic en el botón de abajo:</p>
        <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="background-color: #38a169; color: white; padding: 14px 28px; text-decoration: none; font-size:16px; border-radius: 6px;">Verificar cuenta</a>
        </div>
        <p style="font-size: 14px; color: #718096;">Si no creaste esta cuenta, podés ignorar este correo.</p>
      </div>
      <div style="background-color: #edf2f7; padding: 20px; text-align: center;">
        <p style="font-size: 12px; color: #a0aec0; margin: 0;">© 2025 Ecommerce Int. Todos los derechos reservados.</p>
        <p style="font-size: 12px; color: #a0aec0; margin: 5px 0;">
          Seguinos en:
          <a href="https://facebook.com/" style="color: #2b6cb0; text-decoration: none; margin: 0 5px;">Facebook</a> •
          <a href="https://instagram.com/" style="color: #d53f8c; text-decoration: none; margin: 0 5px;">Instagram</a> •
          <a href="https://twitter.com/" style="color: #3182ce; text-decoration: none; margin: 0 5px;">Twitter</a>
        </p>
        <p style="font-size: 12px; color: #a0aec0;">¿Necesitás ayuda? <a href="mailto:soporte@ecommerce-int.com" style="color: #2b6cb0;">Contactanos</a></p>
      </div>
    </div>
  </div>
`;

export default getVerificationEmailHTML;
