import  Clase  from '../../models/clase/claseModel.js';
import Turno from '../../models/turno/turnoModel.js';
import sequelize from '../../db.js';

export const getClasesPorDia = async (req, res) => {
  const { dia } = req.query;

  if (!dia || typeof dia !== 'string') {
    return res.status(400).json({ error: 'Parámetro "dia" requerido' });
  }

  const diaLower = dia.toLowerCase();

  if (['sábado', 'sabado', 'domingo'].includes(diaLower)) {
    return res.status(200).json({ sin_clases: true, mensaje: 'No brindamos clases los fines de semana.' });
  }

  try {
    const clases = await Clase.findAll({
      where: {
        activo: true,
        dia_semana: diaLower, // 👈 Aquí filtramos directamente por clase
      },
      include: [
        {
          model: Turno,
          attributes: ['hora_inicio', 'hora_fin'],
        },
      ],
    });

    if (!clases || clases.length === 0) {
      return res.status(200).json({ sin_clases: true, mensaje: `No hay clases cargadas para el día ${dia}` });
    }

    res.json(clases);
  } catch (error) {
    console.error('Error al obtener clases por día:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const getTodasClases = async (req, res) => {
  try {
    const clases = await Clase.findAll({
      where: { activo: true },
      include: [
        {
          model: Turno,  // Aseguramos que se incluyan los turnos asociados
          attributes: ['hora_inicio', 'hora_fin'],
        },
      ],
    });
    res.json(clases); // Devuelvo todas las clases activas con sus turnos
  } catch (error) {
    console.error('Error al obtener todas las clases:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// ✅ Obtener una clase específica por ID
export const getClaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const clase = await Clase.findOne({
      where: { id, activo: true },
      include: [
        {
          model: Turno,  // Aseguramos que se incluyan los turnos asociados
          attributes: ['hora_inicio', 'hora_fin'],
        },
      ],
    });

    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    res.json(clase); // Devuelvo la clase con sus turnos
  } catch (error) {
    console.error('Error al obtener clase por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
