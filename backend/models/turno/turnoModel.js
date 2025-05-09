import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cupo_maximo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clases',  
      key: 'id',
    },
  },
}, {
  tableName: 'turnos',
  timestamps: false,
  
});



export default Turno;
