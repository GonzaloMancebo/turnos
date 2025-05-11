import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Reserva = sequelize.define(
  'Reserva',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios', // Referencia a la tabla 'usuarios'
        key: 'id',
      },
    },
    turno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'turnos', // Referencia a la tabla 'turnos'
        key: 'id',
      },
    },
    puntos_utilizados: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    reservado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas', // Nombre de la tabla en la base de datos
    timestamps: false, 
  }
);

export default Reserva;
