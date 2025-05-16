import api from '../api';

export const obtenerPerfil = async (token) => {
  try {
    const response = await api.get('/auth/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarPerfil = async (perfil, token) => {
  try {
    const response = await api.put('/auth/perfil', perfil, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarPerfil = async (token) => {
  try {
    const response = await api.delete('/auth/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
