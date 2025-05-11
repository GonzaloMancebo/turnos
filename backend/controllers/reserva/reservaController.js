import Reserva from '../../models/reserva/reservaModel.js';
import Turno from '../../models/turno/turnoModel.js';
import User from '../../models/user/User.js';

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  try {
const usuario_id = req.user.id; 
const { turno_id, puntos_utilizados } = req.body;

    // Verificar si el turno existe
    const turno = await Turno.findByPk(turno_id);
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    // Verificar si el usuario existe
    const usuario = await User.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si ya existe una reserva para este turno y usuario
    const reservaExistente = await Reserva.findOne({
      where: {
        usuario_id,
        turno_id,
      },
    });

    if (reservaExistente) {
      return res.status(400).json({ message: 'Ya tienes una reserva para este turno' });
    }

    // Crear la reserva
    const reserva = await Reserva.create({
      usuario_id,
      turno_id,
      puntos_utilizados,
      reservado_en: new Date(),
      ya_reservado: true,  // Marcar como reservado al momento de crear la reserva
    });

    // Actualizar el turno para reflejar que está reservado
    await turno.update({
      ya_reservado: true,  // Establecer que el turno ha sido reservado
      cupo_maximo: turno.cupo_maximo - 1,  // Reducir el cupo disponible por 1
    });

    // Volver a obtener el turno después de la actualización
    const updatedTurno = await Turno.findByPk(turno_id);

    // Volver a contar las reservas de este turno
    const reservasRealizadas = await Reserva.count({
      where: { turno_id },
    });

    // Calcular cupos disponibles con el valor actualizado
    const cuposDisponibles = Math.max(updatedTurno.cupo_maximo, 0);

    // Devolver la reserva junto con los datos de cupo
    return res.status(201).json({
      ...reserva.toJSON(),
      reservas_realizadas: reservasRealizadas,
      cupos_disponibles: cuposDisponibles,
      ya_reservado: true,  // Se asegura de que el campo ya_reservado sea true al devolverlo
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la reserva' });
  }
};

// Obtener todas las reservas de un usuario
export const obtenerReservasPorUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    // Verificar si el usuario existe
    const usuario = await User.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener las reservas del usuario con los detalles del turno
    const reservas = await Reserva.findAll({
      where: { usuario_id },
      include: [
        {
          model: Turno,
          as: 'turno',
        },
      ],
    });

    return res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las reservas' });
  }

  
};


export const eliminarReserva = async (req, res) => {
  try {
    const { turno_id } = req.params;
    const usuario_id = req.user.id; // Lo obtenemos del middleware isAuthenticated

    // Verificar si existe la reserva de ese usuario para ese turno
    const reserva = await Reserva.findOne({
      where: { usuario_id, turno_id }
    });

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Eliminar la reserva
    await reserva.destroy();

    // Actualizar el estado del turno (si aplica)
    const turno = await Turno.findByPk(turno_id);
    if (turno) {
      await turno.update({ ya_reservado: false });
    }

    return res.status(200).json({ message: 'Reserva cancelada exitosamente' });
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    return res.status(500).json({ message: 'Error al cancelar la reserva' });
  }
};
