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

    // Verificar si hay cupos disponibles
    const reservasRealizadas = await Reserva.count({ where: { turno_id } });
    if (reservasRealizadas >= turno.cupo_maximo) {
      return res.status(400).json({ message: 'No hay cupos disponibles para este turno' });
    }

    // Crear la reserva
    const reserva = await Reserva.create({
      usuario_id,
      turno_id,
      puntos_utilizados,
      reservado_en: new Date(),
      ya_reservado: true,
    });

    // No modificar cupo_maximo ni ya_reservado en Turno aquí

    // Calcular cupos disponibles después de crear la reserva
    const nuevasReservasRealizadas = reservasRealizadas + 1;
    const cuposDisponibles = Math.max(turno.cupo_maximo - nuevasReservasRealizadas, 0);

    return res.status(201).json({
      ...reserva.toJSON(),
      reservas_realizadas: nuevasReservasRealizadas,
      cupos_disponibles: cuposDisponibles,
      ya_reservado: true,
    });

  } catch (error) {
    console.error('Error en crearReserva:', error);
    return res.status(500).json({ message: 'Error al crear la reserva' });
  }
};


// Obtener todas las reservas de un usuario
export const obtenerReservasPorUsuario = async (req, res) => {
  try {
    const usuario_id = req.user.id; 

    console.log('Obteniendo reservas para usuario:', usuario_id);

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
      order: [
        [{ model: Turno, as: 'turno' }, 'fecha', 'ASC'],
        [{ model: Turno, as: 'turno' }, 'hora_inicio', 'ASC'],
      ],
    });
    console.log('Reservas obtenidas:', reservas);

    return res.status(200).json(reservas);
  } catch (error) {
    console.error('Error en obtenerReservasPorUsuario:', error);
    return res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};





export const eliminarReserva = async (req, res) => {
  try {
    const { turno_id } = req.params;
    const usuario_id = req.user.id;

    // Buscar reserva
    const reserva = await Reserva.findOne({ where: { usuario_id, turno_id } });
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Eliminar reserva
    await reserva.destroy();

    // No modificar el turno (no tocar cupo_maximo ni ya_reservado)

    return res.status(200).json({ message: 'Reserva cancelada exitosamente' });
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    return res.status(500).json({ message: 'Error al cancelar la reserva' });
  }
};

