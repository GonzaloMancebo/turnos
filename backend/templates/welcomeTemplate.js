const getWelcomeEmailHTML = (nombre) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
      <!-- Header -->
      <div style="background-color: #4FD1C5; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <img src="https://i.imgur.com/Tb4kYji.png" alt="Pilates Studio" style="height: 50px; margin-bottom: 10px;">
        <h1 style="color: #ffffff; margin-top: 10px;">Pilates Studio</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px;">
        <h2 style="color: #4FD1C5; text-align: center;">¡Bienvenido/a a Pilates Studio, ${nombre}!</h2>
        <p style="font-size: 16px; color: #2d3748; text-align: center;">Tu cuenta se creó exitosamente. Estás a punto de comenzar un viaje lleno de bienestar, fuerza y armonía. ¡Nos emociona tenerte con nosotros!</p>
        
        <p style="font-size: 16px; color: #4a5568; text-align: center;">Aquí en Pilates Studio, creemos que cada movimiento cuenta. Ya sea que busques tonificar, estirarte o simplemente desconectar, estamos aquí para acompañarte en cada paso de tu proceso.</p>

        <p style="font-size: 16px; color: #4a5568; text-align: center;">Aprovecha al máximo nuestras clases y recursos para sentirte más fuerte, equilibrado y centrado. Recuerda que la verdadera fuerza viene del interior.</p>

        <p style="font-size: 16px; color: #4a5568; text-align: center;">¡No dudes en contactarnos si tienes alguna pregunta o necesitas ayuda para comenzar!</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 14px; color: #718096;">¿Tienes alguna duda? Contacta con nosotros:</p>
          <p style="font-size: 14px; color: #4a5568;">
            <a href="mailto:soporte@pilatesstudio.com" style="color: #4FD1C5; text-decoration: none;">soporte@pilatesstudio.com</a>
            <br>
            <a href="https://wa.me/1234567890" style="color: #4FD1C5; text-decoration: none;">WhatsApp</a>
            <br>
            <a href="https://instagram.com/pilatesstudio" style="color: #4FD1C5; text-decoration: none;">Instagram</a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #edf2f7; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
        <p style="font-size: 12px; color: #a0aec0;">© 2025 Pilates Studio | Todos los derechos reservados</p>
      </div>
    </div>
  </div>
`;

export default getWelcomeEmailHTML;
