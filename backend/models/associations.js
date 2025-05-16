import Clase from './clase/claseModel.js';
import Turno from './turno/turnoModel.js';
import Reserva from './reserva/reservaModel.js';
import User from './user/User.js';

// Asociaciones entre Clase y Turno
Clase.hasMany(Turno, { foreignKey: 'clase_id' });
Turno.belongsTo(Clase, { foreignKey: 'clase_id' });

// Asociaciones entre Reserva y Usuario
Reserva.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });
User.hasMany(Reserva, { foreignKey: 'usuario_id', as: 'reservas' });

// Asociaciones entre Reserva y Turno
Reserva.belongsTo(Turno, { foreignKey: 'turno_id', as: 'turno' });
Turno.hasMany(Reserva, { foreignKey: 'turno_id', as: 'reservas' });

export { Clase, Turno, Reserva, User };
