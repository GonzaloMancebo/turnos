import Turno from '../../models/turno/turnoModel.js';

export const getTurnosPorFecha = async (req, res) => {
  const { claseId } = req.params;  // Obtiene el claseId de los parámetros de la URL

  if (!claseId) {
    return res.status(400).json({ error: 'El id de la clase es requerido' });
  }

  try {
    // Obtener los turnos asociados a la claseId pasada como parámetro
    const turnos = await Turno.findAll({
      where: { clase_id: claseId },
    });

    if (turnos.length === 0) {
      return res.status(200).json({ sin_turnos: true, mensaje: 'No hay turnos programados para esta clase.' });
    }

    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

