import Turno from '../../models/turno/turnoModel.js';
import Reserva from '../../models/reserva/reservaModel.js';

export const getTurnosPorFecha = async (req, res) => {
  const { claseId } = req.params;

  if (!claseId) {
    return res.status(400).json({ error: 'El id de la clase es requerido' });
  }

  try {
    const turnos = await Turno.findAll({
      where: { clase_id: claseId },
      order: [['hora_inicio', 'ASC']],
    });

    if (turnos.length === 0) {
      return res.status(200).json({ sin_turnos: true, mensaje: 'No hay turnos programados para esta clase.' });
    }

    const turnosConCupos = await Promise.all(
      turnos.map(async (turno) => {
        const reservasRealizadas = await Reserva.count({
          where: { turno_id: turno.id },
          
        });

        let yaReservado = false;
    if (req.usuario_id) {
      const reservaUsuario = await Reserva.findOne({
        where: {
          turno_id: turno.id,
          usuario_id: req.usuario_id,
        },
      });

      yaReservado = !!reservaUsuario;
    }

        const cuposDisponibles = turno.cupo_maximo - reservasRealizadas;

        return {
          ...turno.toJSON(),
          reservas_realizadas: reservasRealizadas,
          cupos_disponibles: Math.max(cuposDisponibles, 0),
           ya_reservado: yaReservado,
        };
      })
    );

    res.json(turnosConCupos);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
