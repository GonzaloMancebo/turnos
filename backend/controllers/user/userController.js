import User  from '../../models/user/User.js';  
import bcrypt from 'bcryptjs';
// Obtener perfil de usuario
 const perfil = async (req, res) => {
  try {
    const userId = req.user.id; // `req.user` debería estar disponible si el middleware `isAuthenticated` lo establece

    const user = await User.findByPk(userId);  

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      // Otros campos del perfil
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// Actualizar perfil de usuario
const updatePerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nombre, email, password } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ message: 'El nombre y el email son obligatorios' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.nombre = nombre;
    user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({ message: 'Perfil actualizado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};


// Eliminar cuenta de usuario
 const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

export default {
  perfil,
  updatePerfil,
  deleteUser
};