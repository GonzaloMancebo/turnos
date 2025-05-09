import Clase from '../models/clase/claseModel.js';
import Turno from '../models/turno/turnoModel.js';

// Asociaciones entre Clase y Turno
Clase.hasMany(Turno, { foreignKey: 'clase_id' });
Turno.belongsTo(Clase, { foreignKey: 'clase_id' });
