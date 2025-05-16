import api from "../api";

export const generarReservas = async (usuario_id, turno_id, puntos_utilizados, token) => {
  try {
    
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

export const eliminarReserva = async (turno_id, token) => {
  try {
    console.log('Cancelando reserva con los siguientes datos:');
    console.log('Turno ID:', turno_id);

    // Asegúrate de enviar el token JWT si es necesario para la autenticación
    const response = await api.delete(
      `/api/reservas/${turno_id}`,  // Ruta con el turno_id que se quiere cancelar
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Incluir el token JWT en la cabecera
        },
      }
    );

    // Verificamos si la respuesta es exitosa
    if (response.status !== 200) {
      throw new Error("Respuesta inesperada del servidor");
    }

    console.log("Respuesta del servidor:", response.data);
    return response.data;  // Retorna el mensaje de éxito
  } catch (err) {
    console.error("Error en la solicitud:", err.response ? err.response.data : err.message);
    throw new Error("No se pudo cancelar la reserva");
  }
};

export const obtenerReservasPorUsuario = async (usuario_id, token) => {
  try {
    console.log('Obteniendo reservas para el usuario con ID:', usuario_id);

    // Asegúrate de enviar el token JWT si es necesario para la autenticación
    const response = await api.get(`/api/reservas/usuario`, {
  headers: { Authorization: `Bearer ${token}` },
});


    // Verificamos si la respuesta es exitosa
    if (response.status !== 200) {
      throw new Error("Respuesta inesperada del servidor");
    }

    console.log("Respuesta del servidor:", response.data);
    return response.data;  // Retorna la lista de reservas
  } catch (err) {
    console.error("Error en la solicitud:", err.response ? err.response.data : err.message);
    throw new Error("No se pudieron obtener las reservas");
  }
};