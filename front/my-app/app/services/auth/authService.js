import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';

const register = async (nombre, email, password) => {
  try {
    const response = await api.post('/auth/register', { nombre, email, password });
    await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error.response?.data || error.message);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

export default {
  register,
  login,
  logout,
  getToken,
};
