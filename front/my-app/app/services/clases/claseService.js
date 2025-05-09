import api from '../api'; 

// Servicio para obtener las clases de un día específico
export const obtenerClasesPorDia = async (dia) => {

  try {
    const response = await api.get(`/api/clases/dia?dia=${dia}`);

    return response.data;  // Devolvemos los datos recibidos del servidor
  } catch (_err) {  
    throw new Error('No se pudieron obtener las clases. Intenta de nuevo.');
  }
};


