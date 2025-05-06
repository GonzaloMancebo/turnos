const getWelcomeEmailHTML = (nombre) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
      <div style="background-color: #2d3748; padding: 20px; text-align: center;">
        <img src="https://i.imgur.com/O7pWhBv.png" alt="Ecommerce Int" style="height: 50px;">
        <h1 style="color: #ffffff; margin-top: 10px;">Ecommerce Int</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #2d3748;">¡Bienvenido/a ${nombre}!</h2>
        <p style="font-size: 16px; color: #4a5568;">Tu cuenta se creó exitosamente y ya está verificada.</p>
        <p style="font-size: 16px; color: #4a5568;">Ahora podés explorar todos nuestros productos y beneficios.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000/" style="background-color: #38a169; color: white; padding: 14px 28px; text-decoration: none; font-size: 16px; border-radius: 6px;">Ir al sitio</a>
        </div>
        <p style="font-size: 14px; color: #718096;">¡Gracias por unirte a nuestra comunidad!</p>
      </div>
      <div style="background-color: #edf2f7; padding: 20px; text-align: center;">
        <p style="font-size: 12px; color: #a0aec0;">© 2025 Ecommerce Int • <a href="mailto:soporte@ecommerce-int.com" style="color: #2b6cb0;">Soporte</a></p>
      </div>
    </div>
  </div>
`;

export default getWelcomeEmailHTML;
