import Turno from '../../models/turno/turnoModel.js';
import Reserva from '../../models/reserva/reservaModel.js';

export const getTurnosPorFecha = async (req, res) => {
  const { claseId } = req.params;
  const { fecha } = req.query;
  const usuarioId = req.usuario_id; // debe venir del middleware de auth

  if (!claseId) {
    return res.status(400).json({ error: 'El id de la clase es requerido' });
  }
  if (!fecha) {
    return res.status(400).json({ error: 'La fecha es requerida' });
  }

  try {
    // Buscamos todos los turnos de esa clase y fecha
    const turnos = await Turno.findAll({
      where: {
        clase_id: claseId,
        fecha,
      },
      order: [['hora_inicio', 'ASC']],
    });

    if (turnos.length === 0) {
      return res.status(200).json({ sin_turnos: true, mensaje: 'No hay turnos programados para esta clase en esta fecha.' });
    }

const turnosConInfo = await Promise.all(
  turnos.map(async (turno) => {
    const reservasRealizadas = await Reserva.count({
      where: { turno_id: turno.id },
    });

    let usuarioYaReservo = false;
    if (usuarioId) {
      const reservaUsuario = await Reserva.findOne({
        where: {
          turno_id: turno.id,
          usuario_id: usuarioId,
        },
      });
      usuarioYaReservo = !!reservaUsuario;
    }

    const cuposDisponibles = turno.cupo_maximo - reservasRealizadas;

    return {
      ...turno.toJSON(),
      reservas_realizadas: reservasRealizadas,
      cupos_disponibles: Math.max(cuposDisponibles, 0),
      usuario_ya_reservo: usuarioYaReservo,
    };
  })
);



    return res.json(turnosConInfo);

  } catch (error) {
    console.error('Error al obtener turnos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
