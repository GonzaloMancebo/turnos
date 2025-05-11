import api from "../api";

export const generarReservas = async (usuario_id, turno_id, puntos_utilizados, token) => {
  try {
    console.log('Generando reserva con los siguientes datos:');
    console.log('Usuario ID:', usuario_id);
    console.log('Turno ID:', turno_id);
    console.log('Puntos utilizados:', puntos_utilizados);  // Verifica que se está pasando el valor correcto
    
    // Asegúrate de enviar el token JWT si es necesario para la autenticación
    const response = await api.post(
      `/api/reservas`,
      {
        usuario_id,  // ID del usuario
        turno_id,     // ID del turno
        puntos_utilizados  // Puntos utilizados
      },
      {
        headers: {
          Authorization: `Bearer ${token}`  // Incluir el token JWT en la cabecera
        }
      }
    );

    // Verificamos si la respuesta es exitosa
    if (response.status !== 201) {
      throw new Error("Respuesta inesperada del servidor");
    }

    console.log("Respuesta del servidor:", response.data);
    return response.data; 
  } catch (err) {
    console.error("Error en la solicitud:", err.response ? err.response.data : err.message);
    throw new Error("No se pudo crear la reserva");
  }
};
